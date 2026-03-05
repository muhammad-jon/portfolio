import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { persistSessionId, socket } from "./socket";
import type {
  CursorLeavePayload,
  CursorMovePayload,
  CursorSnapshot,
  CursorStatePayload,
  CursorUpdatePayload,
  LiveCursorsStore,
  SelfIdentity,
  SessionPayload,
} from "./types";

const THROTTLE_MS = Math.floor(1000 / 12);
const STALE_MS = 10_000;
const STALE_SWEEP_MS = 2_000;
const HIDDEN_COORD = -10_000;

const LiveCursorsContext = createContext<LiveCursorsStore | null>(null);

function hasCursorChanged(
  previous: CursorSnapshot | undefined,
  next: CursorSnapshot,
) {
  if (!previous) return true;
  return (
    previous.x !== next.x ||
    previous.y !== next.y ||
    previous.page !== next.page ||
    previous.name !== next.name ||
    previous.color !== next.color ||
    previous.sessionId !== next.sessionId ||
    previous.ts !== next.ts
  );
}

function subscribeToPathChanges(onPathChange: (pathname: string) => void) {
  const notify = () => onPathChange(window.location.pathname);

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  const patchedPushState: History["pushState"] = function pushState(
    data,
    unused,
    url,
  ) {
    originalPushState.call(window.history, data, unused, url);
    notify();
  };

  const patchedReplaceState: History["replaceState"] = function replaceState(
    data,
    unused,
    url,
  ) {
    originalReplaceState.call(window.history, data, unused, url);
    notify();
  };

  window.history.pushState = patchedPushState;
  window.history.replaceState = patchedReplaceState;
  window.addEventListener("popstate", notify);

  return () => {
    window.history.pushState = originalPushState;
    window.history.replaceState = originalReplaceState;
    window.removeEventListener("popstate", notify);
  };
}

export function LiveCursorsProvider({ children }: { children: ReactNode }) {
  const cursorsRef = useRef(new Map<string, CursorSnapshot>());
  const listenersRef = useRef(new Set<() => void>());
  const versionRef = useRef(0);
  const selfRef = useRef<SelfIdentity | null>(null);
  const pointerClientRef = useRef<{ x: number; y: number } | null>(null);
  const pointerInsideRef = useRef(false);
  const pathRef = useRef(
    typeof window === "undefined" ? "/" : window.location.pathname,
  );
  const lastSentAtRef = useRef(0);
  const throttleTimerRef = useRef<number | null>(null);

  const notify = useCallback(() => {
    versionRef.current += 1;
    for (const listener of listenersRef.current) {
      listener();
    }
  }, []);

  const clearThrottleTimer = useCallback(() => {
    if (throttleTimerRef.current === null) return;
    window.clearTimeout(throttleTimerRef.current);
    throttleTimerRef.current = null;
  }, []);

  const upsertCursor = useCallback(
    (payload: CursorMovePayload) => {
      if (!payload?.id || payload.id === socket.id) return;

      const next: CursorSnapshot = {
        ...payload,
        lastSeen: Date.now(),
      };

      const previous = cursorsRef.current.get(payload.id);
      cursorsRef.current.set(payload.id, next);
      if (!hasCursorChanged(previous, next)) return;
      notify();
    },
    [notify],
  );

  const removeCursor = useCallback(
    (id: string) => {
      if (!cursorsRef.current.delete(id)) return;
      notify();
    },
    [notify],
  );

  const emitCursorUpdate = useCallback((forceHidden = false) => {
    if (!socket.connected) return;

    const pointer = pointerClientRef.current;
    const isVisible = !forceHidden && pointerInsideRef.current && Boolean(pointer);

    const x = isVisible && pointer ? pointer.x + window.scrollX : HIDDEN_COORD;
    const y = isVisible && pointer ? pointer.y + window.scrollY : HIDDEN_COORD;
    const ts = Date.now();

    const payload: CursorUpdatePayload = {
      x,
      y,
      page: pathRef.current,
      ts,
    };

    socket.emit("cursor:update", payload);
    lastSentAtRef.current = ts;
  }, []);

  const scheduleCursorUpdate = useCallback(
    (options?: { force?: boolean; hidden?: boolean }) => {
      const force = Boolean(options?.force);
      const hidden = Boolean(options?.hidden);

      if (force) {
        clearThrottleTimer();
        emitCursorUpdate(hidden);
        return;
      }

      const elapsed = Date.now() - lastSentAtRef.current;
      if (elapsed >= THROTTLE_MS) {
        clearThrottleTimer();
        emitCursorUpdate(hidden);
        return;
      }

      if (throttleTimerRef.current !== null) {
        return;
      }

      const waitMs = THROTTLE_MS - elapsed;
      throttleTimerRef.current = window.setTimeout(() => {
        throttleTimerRef.current = null;
        emitCursorUpdate(hidden);
      }, waitMs);
    },
    [clearThrottleTimer, emitCursorUpdate],
  );

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleSession = (payload: SessionPayload) => {
      if (!payload?.sessionId) return;

      const nextSelf: SelfIdentity = {
        sessionId: payload.sessionId,
        name: payload.name,
        color: payload.color,
      };

      persistSessionId(payload.sessionId);
      selfRef.current = nextSelf;
      notify();
    };

    const handleState = (payload: CursorStatePayload) => {
      const nextMap = new Map<string, CursorSnapshot>();
      for (const cursor of payload) {
        if (!cursor?.id || cursor.id === socket.id) continue;
        nextMap.set(cursor.id, {
          ...cursor,
          lastSeen: Date.now(),
        });
      }

      const previous = cursorsRef.current;
      let changed = previous.size !== nextMap.size;
      if (!changed) {
        for (const [id, cursor] of nextMap.entries()) {
          if (hasCursorChanged(previous.get(id), cursor)) {
            changed = true;
            break;
          }
        }
      }

      cursorsRef.current = nextMap;
      if (changed) {
        notify();
      }
    };

    const handleMove = (payload: CursorMovePayload) => {
      upsertCursor(payload);
    };

    const handleLeave = (payload: CursorLeavePayload) => {
      if (!payload?.id) return;
      removeCursor(payload.id);
    };

    const handleConnect = () => {
      scheduleCursorUpdate({
        force: true,
        hidden: !pointerInsideRef.current || !pointerClientRef.current,
      });
    };

    socket.on("session", handleSession);
    socket.on("cursor:state", handleState);
    socket.on("cursor:move", handleMove);
    socket.on("cursor:leave", handleLeave);
    socket.on("connect", handleConnect);

    const staleTimer = window.setInterval(() => {
      const now = Date.now();
      let changed = false;
      for (const [id, cursor] of cursorsRef.current.entries()) {
        if (now - cursor.lastSeen <= STALE_MS) continue;
        cursorsRef.current.delete(id);
        changed = true;
      }
      if (changed) {
        notify();
      }
    }, STALE_SWEEP_MS);

    return () => {
      socket.off("session", handleSession);
      socket.off("cursor:state", handleState);
      socket.off("cursor:move", handleMove);
      socket.off("cursor:leave", handleLeave);
      socket.off("connect", handleConnect);
      clearThrottleTimer();
      window.clearInterval(staleTimer);
      socket.disconnect();
    };
  }, [clearThrottleTimer, notify, removeCursor, scheduleCursorUpdate, upsertCursor]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerInsideRef.current = true;
      pointerClientRef.current = { x: event.clientX, y: event.clientY };
      scheduleCursorUpdate();
    };

    const handlePointerEnter = (event: PointerEvent) => {
      pointerInsideRef.current = true;
      pointerClientRef.current = { x: event.clientX, y: event.clientY };
      scheduleCursorUpdate({ force: true });
    };

    const handlePointerLeave = () => {
      pointerInsideRef.current = false;
      scheduleCursorUpdate({ force: true, hidden: true });
    };

    const handleScroll = () => {
      if (!pointerClientRef.current) return;
      scheduleCursorUpdate();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "hidden") return;
      pointerInsideRef.current = false;
      scheduleCursorUpdate({ force: true, hidden: true });
    };

    const unsubscribePath = subscribeToPathChanges((pathname) => {
      pathRef.current = pathname;
      scheduleCursorUpdate({
        force: true,
        hidden: !pointerInsideRef.current || !pointerClientRef.current,
      });
    });

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerenter", handlePointerEnter, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      unsubscribePath();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerenter", handlePointerEnter);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [scheduleCursorUpdate]);

  const store = useMemo<LiveCursorsStore>(() => {
    return {
      subscribe(listener) {
        listenersRef.current.add(listener);
        return () => {
          listenersRef.current.delete(listener);
        };
      },
      getVersion() {
        return versionRef.current;
      },
      getCursors() {
        return cursorsRef.current;
      },
      getSelf() {
        return selfRef.current;
      },
    };
  }, []);

  return (
    <LiveCursorsContext.Provider value={store}>
      {children}
    </LiveCursorsContext.Provider>
  );
}

export function useLiveCursorsStore() {
  const context = useContext(LiveCursorsContext);
  if (!context) {
    throw new Error("useLiveCursorsStore must be used within LiveCursorsProvider");
  }
  return context;
}
