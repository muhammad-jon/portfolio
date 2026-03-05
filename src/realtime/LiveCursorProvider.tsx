import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { socket } from "./socket";
import type {
  CursorLeavePayload,
  CursorMovePayload,
  CursorSnapshot,
  CursorStatePayload,
  CursorUpdatePayload,
  LiveCursorStore,
} from "./types";

const SEND_RATE_HZ = 12;
const SEND_INTERVAL_MS = 1000 / SEND_RATE_HZ;
const STALE_TIMEOUT_MS = 10_000;
const STALE_SWEEP_MS = 2_000;
const HIDDEN_COORD = -10_000;

const LiveCursorContext = createContext<LiveCursorStore | null>(null);

function didCursorChange(
  previous: CursorSnapshot | undefined,
  next: CursorSnapshot,
) {
  if (!previous) return true;
  return (
    previous.x !== next.x ||
    previous.y !== next.y ||
    previous.page !== next.page ||
    previous.name !== next.name ||
    previous.color !== next.color
  );
}

function subscribeToPathnameChange(onChange: (pathname: string) => void) {
  const notify = () => onChange(window.location.pathname);
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

export function LiveCursorProvider({ children }: { children: ReactNode }) {
  const cursorsRef = useRef(new Map<string, CursorSnapshot>());
  const listenersRef = useRef(new Set<() => void>());
  const versionRef = useRef(0);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const pointerInsideRef = useRef(false);
  const pendingUpdateRef = useRef(false);
  const currentPathRef = useRef(
    typeof window === "undefined" ? "/" : window.location.pathname,
  );

  const notify = useCallback(() => {
    versionRef.current += 1;
    for (const listener of listenersRef.current) {
      listener();
    }
  }, []);

  const upsertCursor = useCallback(
    (payload: CursorMovePayload) => {
      if (!payload?.id) return;

      const next: CursorSnapshot = {
        ...payload,
        lastSeen: Date.now(),
      };

      const previous = cursorsRef.current.get(payload.id);
      cursorsRef.current.set(payload.id, next);
      if (!didCursorChange(previous, next)) return;
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

  const clearCursors = useCallback(() => {
    if (cursorsRef.current.size === 0) return;
    cursorsRef.current.clear();
    notify();
  }, [notify]);

  const emitCursorUpdate = useCallback(() => {
    if (!socket.connected) return;

    let x = HIDDEN_COORD;
    let y = HIDDEN_COORD;
    if (pointerInsideRef.current && pointerRef.current) {
      x = pointerRef.current.x;
      y = pointerRef.current.y;
    }

    const payload: CursorUpdatePayload = {
      x,
      y,
      page: currentPathRef.current,
    };

    socket.emit("cursor:update", payload);
  }, []);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleState = (state: CursorStatePayload) => {
      const nextMap = new Map<string, CursorSnapshot>();
      for (const cursor of state) {
        if (!cursor?.id) continue;
        nextMap.set(cursor.id, {
          ...cursor,
          lastSeen: Date.now(),
        });
      }

      const previous = cursorsRef.current;
      let changed = previous.size !== nextMap.size;

      if (!changed) {
        for (const [id, cursor] of nextMap.entries()) {
          if (didCursorChange(previous.get(id), cursor)) {
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

    const handleMove = (cursor: CursorMovePayload) => {
      upsertCursor(cursor);
    };

    const handleLeave = ({ id }: CursorLeavePayload) => {
      if (!id) return;
      removeCursor(id);
    };

    const handleConnect = () => {
      emitCursorUpdate();
      pendingUpdateRef.current = false;
    };

    const handleDisconnect = () => {
      clearCursors();
    };

    socket.on("cursor:state", handleState);
    socket.on("cursor:move", handleMove);
    socket.on("cursor:leave", handleLeave);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    const sendTimer = window.setInterval(() => {
      if (!pendingUpdateRef.current) return;
      if (!socket.connected) return;
      pendingUpdateRef.current = false;
      emitCursorUpdate();
    }, SEND_INTERVAL_MS);

    const staleTimer = window.setInterval(() => {
      const now = Date.now();
      let changed = false;
      for (const [id, cursor] of cursorsRef.current.entries()) {
        if (now - cursor.lastSeen <= STALE_TIMEOUT_MS) continue;
        cursorsRef.current.delete(id);
        changed = true;
      }
      if (changed) {
        notify();
      }
    }, STALE_SWEEP_MS);

    return () => {
      socket.off("cursor:state", handleState);
      socket.off("cursor:move", handleMove);
      socket.off("cursor:leave", handleLeave);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      window.clearInterval(sendTimer);
      window.clearInterval(staleTimer);
      socket.disconnect();
      pendingUpdateRef.current = false;
      clearCursors();
    };
  }, [clearCursors, emitCursorUpdate, notify, removeCursor, upsertCursor]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerInsideRef.current = true;
      pointerRef.current = { x: event.clientX, y: event.clientY };
      pendingUpdateRef.current = true;
    };

    const handlePointerEnter = (event: PointerEvent) => {
      pointerInsideRef.current = true;
      pointerRef.current = { x: event.clientX, y: event.clientY };
      pendingUpdateRef.current = false;
      emitCursorUpdate();
    };

    const handlePointerLeave = () => {
      pointerInsideRef.current = false;
      pendingUpdateRef.current = false;
      emitCursorUpdate();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "hidden") return;
      pointerInsideRef.current = false;
      pendingUpdateRef.current = false;
      emitCursorUpdate();
    };

    const unsubscribePath = subscribeToPathnameChange((pathname) => {
      currentPathRef.current = pathname;
      pendingUpdateRef.current = false;
      emitCursorUpdate();
    });

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerenter", handlePointerEnter, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      unsubscribePath();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerenter", handlePointerEnter);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [emitCursorUpdate]);

  const store = useMemo<LiveCursorStore>(() => {
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
    };
  }, []);

  return (
    <LiveCursorContext.Provider value={store}>
      {children}
    </LiveCursorContext.Provider>
  );
}

export function useLiveCursorStore() {
  const context = useContext(LiveCursorContext);
  if (!context) {
    throw new Error("useLiveCursorStore must be used within LiveCursorProvider");
  }
  return context;
}
