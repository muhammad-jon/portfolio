import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useLocation } from "react-router-dom";
import { useLiveCursorsStore } from "./LiveCursorsProvider";
import type { CursorSnapshot } from "./types";

const LERP_FACTOR = 0.35;
const SNAP_DISTANCE = 0.2;
const HIDDEN_THRESHOLD = -9_000;

interface AnimatedCursor extends CursorSnapshot {
  targetX: number;
  targetY: number;
  renderX: number;
  renderY: number;
}

function measureDocumentBounds() {
  const doc = document.documentElement;
  const body = document.body;

  const height = Math.max(
    doc.scrollHeight,
    doc.offsetHeight,
    body?.scrollHeight ?? 0,
    body?.offsetHeight ?? 0,
    window.innerHeight,
  );

  const width = Math.max(
    doc.scrollWidth,
    doc.offsetWidth,
    body?.scrollWidth ?? 0,
    body?.offsetWidth ?? 0,
    window.innerWidth,
  );

  return { width, height };
}

function CursorArrow({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="22"
      viewBox="0 0 16 22"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.28)]"
    >
      <path
        d="M0 0L0 18L4.8 14.5L8.1 21.3L11 19.8L7.8 13.2H14L0 0Z"
        fill={color}
        stroke="white"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function LiveCursorsLayer() {
  const location = useLocation();
  const store = useLiveCursorsStore();
  const version = useSyncExternalStore(
    store.subscribe,
    store.getVersion,
    store.getVersion,
  );
  const animatedRef = useRef(new Map<string, AnimatedCursor>());
  const [frame, setFrame] = useState(0);
  const [bounds, setBounds] = useState(() => {
    if (typeof window === "undefined") {
      return { width: 0, height: 0 };
    }
    return measureDocumentBounds();
  });

  useEffect(() => {
    const source = store.getCursors();
    const animated = animatedRef.current;
    let changed = false;

    for (const [id, cursor] of source.entries()) {
      const existing = animated.get(id);
      if (!existing) {
        animated.set(id, {
          ...cursor,
          targetX: cursor.x,
          targetY: cursor.y,
          renderX: cursor.x,
          renderY: cursor.y,
        });
        changed = true;
        continue;
      }

      existing.sessionId = cursor.sessionId;
      existing.name = cursor.name;
      existing.color = cursor.color;
      existing.page = cursor.page;
      existing.ts = cursor.ts;
      existing.lastSeen = cursor.lastSeen;
      existing.targetX = cursor.x;
      existing.targetY = cursor.y;
    }

    for (const id of Array.from(animated.keys())) {
      if (source.has(id)) continue;
      animated.delete(id);
      changed = true;
    }

    if (changed) {
      setFrame((value) => value + 1);
    }
  }, [store, version]);

  useEffect(() => {
    let rafId = 0;

    const animate = () => {
      let changed = false;

      for (const cursor of animatedRef.current.values()) {
        const dx = cursor.targetX - cursor.renderX;
        const dy = cursor.targetY - cursor.renderY;

        if (Math.abs(dx) > SNAP_DISTANCE || Math.abs(dy) > SNAP_DISTANCE) {
          cursor.renderX += dx * LERP_FACTOR;
          cursor.renderY += dy * LERP_FACTOR;
          changed = true;
          continue;
        }

        if (
          cursor.renderX !== cursor.targetX ||
          cursor.renderY !== cursor.targetY
        ) {
          cursor.renderX = cursor.targetX;
          cursor.renderY = cursor.targetY;
          changed = true;
        }
      }

      if (changed) {
        setFrame((value) => value + 1);
      }

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const updateBounds = () => {
      const next = measureDocumentBounds();
      setBounds((prev) => {
        if (prev.width === next.width && prev.height === next.height) {
          return prev;
        }
        return next;
      });
    };

    updateBounds();

    window.addEventListener("resize", updateBounds);
    const intervalId = window.setInterval(updateBounds, 1000);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateBounds);
      observer.observe(document.documentElement);
      if (document.body) {
        observer.observe(document.body);
      }
    }

    return () => {
      window.removeEventListener("resize", updateBounds);
      window.clearInterval(intervalId);
      observer?.disconnect();
    };
  }, []);

  const cursors = useMemo(() => {
    const maxX = Math.max(0, bounds.width - 20);
    const maxY = Math.max(0, bounds.height - 24);

    return Array.from(animatedRef.current.values())
      .filter(
        (cursor) =>
          cursor.targetX > HIDDEN_THRESHOLD &&
          cursor.targetY > HIDDEN_THRESHOLD,
      )
      .map((cursor) => ({
        ...cursor,
        renderX: clamp(cursor.renderX, 0, maxX),
        renderY: clamp(cursor.renderY, 0, maxY),
      }));
  }, [bounds.height, bounds.width, frame, version]);

  if (cursors.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: `${bounds.height}px`,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {cursors.map((cursor) => {
        const isCurrentPage = cursor.page === location.pathname;
        console.log(cursor);

        return (
          <div
            key={cursor.id}
            style={{
              position: "absolute",
              transform: `translate3d(${cursor.renderX}px, ${cursor.renderY}px, 0)`,
              opacity: isCurrentPage ? 1 : 0.25,
              willChange: "transform",
            }}
          >
            <CursorArrow color={cursor.color} />
            <div
              className="absolute left-3 top-4 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-[0_4px_12px_rgba(0,0,0,0.24)]"
              style={{
                backgroundColor: cursor.color,
              }}
            >
              {cursor.name} {!isCurrentPage && `(${cursor.page})`}
            </div>
          </div>
        );
      })}
    </div>
  );
}
