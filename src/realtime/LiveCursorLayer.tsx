import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useLocation } from "react-router-dom";
import { useLiveCursorStore } from "./LiveCursorProvider";
import type { CursorSnapshot } from "./types";

const LERP_FACTOR = 0.35;
const SNAP_DISTANCE = 0.15;
const STALE_TIMEOUT_MS = 10_000;

interface AnimatedCursor extends CursorSnapshot {
  renderX: number;
  renderY: number;
  targetX: number;
  targetY: number;
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

export function LiveCursorLayer() {
  const location = useLocation();
  const store = useLiveCursorStore();
  const version = useSyncExternalStore(
    store.subscribe,
    store.getVersion,
    store.getVersion,
  );

  const animatedRef = useRef(new Map<string, AnimatedCursor>());
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const source = store.getCursors();
    const animated = animatedRef.current;
    let changed = false;

    for (const [id, cursor] of source.entries()) {
      const existing = animated.get(id);
      if (!existing) {
        animated.set(id, {
          ...cursor,
          renderX: cursor.x,
          renderY: cursor.y,
          targetX: cursor.x,
          targetY: cursor.y,
        });
        changed = true;
        continue;
      }

      existing.name = cursor.name;
      existing.color = cursor.color;
      existing.page = cursor.page;
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
      const now = Date.now();
      let changed = false;

      for (const [id, cursor] of animatedRef.current.entries()) {
        if (now - cursor.lastSeen > STALE_TIMEOUT_MS) {
          animatedRef.current.delete(id);
          changed = true;
          continue;
        }

        const deltaX = cursor.targetX - cursor.renderX;
        const deltaY = cursor.targetY - cursor.renderY;

        if (Math.abs(deltaX) > SNAP_DISTANCE || Math.abs(deltaY) > SNAP_DISTANCE) {
          cursor.renderX += deltaX * LERP_FACTOR;
          cursor.renderY += deltaY * LERP_FACTOR;
          changed = true;
        } else if (cursor.renderX !== cursor.targetX || cursor.renderY !== cursor.targetY) {
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

  const cursors = useMemo(() => {
    return Array.from(animatedRef.current.values()).filter((cursor) => {
      return cursor.targetX >= 0 && cursor.targetY >= 0;
    });
  }, [frame, version]);

  if (cursors.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {cursors.map((cursor) => {
        const isCurrentPage = cursor.page === location.pathname;
        return (
          <div
            key={cursor.id}
            className="fixed left-0 top-0 will-change-transform"
            style={{
              opacity: isCurrentPage ? 1 : 0.42,
              transform: `translate3d(${cursor.renderX}px, ${cursor.renderY}px, 0)`,
            }}
          >
            <CursorArrow color={cursor.color} />
            <div
              className="absolute left-3 top-4 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-[0_4px_12px_rgba(0,0,0,0.24)]"
              style={{ backgroundColor: cursor.color }}
            >
              {cursor.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
