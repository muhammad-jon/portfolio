import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { MousePointer2 } from "lucide-react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { useLiveCursorsStore } from "./LiveCursorsProvider";
import type { CursorSnapshot } from "./types";

const LERP_FACTOR = 0.35;
const SNAP_DISTANCE = 0.2;
const HIDDEN_THRESHOLD = 0;
const CURSOR_W = 28;
const CURSOR_H = 28;
const VISIBILITY_STORAGE_KEY = "live-cursors-visible";

interface DocumentBounds {
  width: number;
  height: number;
}

interface ViewportOffset {
  x: number;
  y: number;
}

interface AnimatedCursor extends CursorSnapshot {
  renderX: number;
  renderY: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getInitialVisibility() {
  if (typeof window === "undefined") {
    return true;
  }

  const saved = window.localStorage.getItem(VISIBILITY_STORAGE_KEY);
  if (saved === "0") {
    return false;
  }
  if (saved === "1") {
    return true;
  }
  return true;
}

function MousePointer2Off({ size }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-mouse-pointer2-off-icon lucide-mouse-pointer-2-off"
    >
      <path d="m15.55 8.45 5.138 2.087a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063L8.45 15.551" />
      <path d="M22 2 2 22" />
      <path d="m6.816 11.528-2.779-6.84a.495.495 0 0 1 .651-.651l6.84 2.779" />
    </svg>
  );
}

function measureDocumentBounds(): DocumentBounds {
  const doc = document.documentElement;
  const body = document.body;

  const width = Math.max(
    doc.scrollWidth,
    doc.clientWidth,
    body?.scrollWidth ?? 0,
    body?.clientWidth ?? 0,
    window.innerWidth,
    1,
  );

  const height = Math.max(
    doc.scrollHeight,
    doc.clientHeight,
    body?.scrollHeight ?? 0,
    body?.clientHeight ?? 0,
    window.innerHeight,
    1,
  );

  return { width, height };
}

function normalizedToDocumentPixels(
  nx: number,
  ny: number,
  bounds: DocumentBounds,
) {
  const maxX = Math.max(0, bounds.width - CURSOR_W);
  const maxY = Math.max(0, bounds.height - CURSOR_H);

  return {
    x: clamp(nx * bounds.width, 0, maxX),
    y: clamp(ny * bounds.height, 0, maxY),
  };
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

export function LiveCursorsLayer() {
  const location = useLocation();
  const store = useLiveCursorsStore();
  const version = useSyncExternalStore(
    store.subscribe,
    store.getVersion,
    store.getVersion,
  );
  const [isVisible, setIsVisible] = useState<boolean>(getInitialVisibility);
  const animatedRef = useRef(new Map<string, AnimatedCursor>());
  const [frame, setFrame] = useState(0);
  const [bounds, setBounds] = useState<DocumentBounds>(() => {
    if (typeof window === "undefined") {
      return { width: 1, height: 1 };
    }
    return measureDocumentBounds();
  });
  const [viewportOffset, setViewportOffset] = useState<ViewportOffset>(() => {
    if (typeof window === "undefined") {
      return { x: 0, y: 0 };
    }
    return { x: window.scrollX, y: window.scrollY };
  });
  const boundsRef = useRef(bounds);

  useEffect(() => {
    boundsRef.current = bounds;
  }, [bounds]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(VISIBILITY_STORAGE_KEY, isVisible ? "1" : "0");
  }, [isVisible]);

  useEffect(() => {
    const source = store.getCursors();
    const animated = animatedRef.current;
    let changed = false;

    for (const [id, cursor] of source.entries()) {
      const existing = animated.get(id);
      if (!existing) {
        const mapped = normalizedToDocumentPixels(
          cursor.nx,
          cursor.ny,
          boundsRef.current,
        );
        animated.set(id, {
          ...cursor,
          renderX: mapped.x,
          renderY: mapped.y,
        });
        changed = true;
        continue;
      }

      existing.sessionId = cursor.sessionId;
      existing.name = cursor.name;
      existing.color = cursor.color;
      existing.nx = cursor.nx;
      existing.ny = cursor.ny;
      existing.page = cursor.page;
      existing.ts = cursor.ts;
      existing.lastSeen = cursor.lastSeen;
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
        if (cursor.nx < HIDDEN_THRESHOLD || cursor.ny < HIDDEN_THRESHOLD) {
          continue;
        }

        const target = normalizedToDocumentPixels(
          cursor.nx,
          cursor.ny,
          boundsRef.current,
        );
        const deltaX = target.x - cursor.renderX;
        const deltaY = target.y - cursor.renderY;

        if (
          Math.abs(deltaX) > SNAP_DISTANCE ||
          Math.abs(deltaY) > SNAP_DISTANCE
        ) {
          cursor.renderX += deltaX * LERP_FACTOR;
          cursor.renderY += deltaY * LERP_FACTOR;
          changed = true;
          continue;
        }

        if (cursor.renderX !== target.x || cursor.renderY !== target.y) {
          cursor.renderX = target.x;
          cursor.renderY = target.y;
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
      setBounds((previous) => {
        if (previous.width === next.width && previous.height === next.height) {
          return previous;
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

  useEffect(() => {
    const updateViewportOffset = () => {
      const nextX = window.scrollX;
      const nextY = window.scrollY;
      setViewportOffset((previous) => {
        if (previous.x === nextX && previous.y === nextY) {
          return previous;
        }
        return { x: nextX, y: nextY };
      });
    };

    updateViewportOffset();
    window.addEventListener("scroll", updateViewportOffset, { passive: true });
    window.addEventListener("resize", updateViewportOffset);

    return () => {
      window.removeEventListener("scroll", updateViewportOffset);
      window.removeEventListener("resize", updateViewportOffset);
    };
  }, []);

  const cursors = useMemo(() => {
    return Array.from(animatedRef.current.values()).filter(
      (cursor) =>
        cursor.nx >= HIDDEN_THRESHOLD &&
        cursor.ny >= HIDDEN_THRESHOLD &&
        cursor.nx <= 1 &&
        cursor.ny <= 1,
    );
  }, [frame, version]);

  const toggleButton = (
    <button
      type="button"
      onClick={() => setIsVisible((previous) => !previous)}
      aria-label={
        isVisible ? "Hide live cursors overlay" : "Show live cursors overlay"
      }
      title={isVisible ? "Hide live cursors" : "Show live cursors"}
      style={{
        position: "fixed",
        right: "16px",
        bottom: "16px",
        zIndex: 2147483647,
        width: "40px",
        height: "40px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "9999px",
        border: "1px solid hsl(var(--line) / 0.8)",
        background: "hsl(var(--surface) / 0.9)",
        color: "hsl(var(--muted))",
        boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
        backdropFilter: "blur(8px)",
        pointerEvents: "auto",
        cursor: "pointer",
      }}
    >
      {isVisible ? <MousePointer2 size={16} /> : <MousePointer2Off size={16} />}
    </button>
  );

  const overlay =
    isVisible && cursors.length > 0 ? (
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 9999,
        }}
      >
        {cursors.map((cursor) => {
          const isCurrentPage = cursor.page === location.pathname;
          const viewportX = cursor.renderX - viewportOffset.x;
          const viewportY = cursor.renderY - viewportOffset.y;

          return (
            <div
              key={cursor.id}
              style={{
                position: "absolute",
                transform: `translate3d(${viewportX}px, ${viewportY}px, 0)`,
                opacity: isCurrentPage ? 1 : 0.5,
                willChange: "transform",
              }}
            >
              <CursorArrow color={cursor.color} />
              <div
                className="absolute left-3 top-4 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-[0_4px_12px_rgba(0,0,0,0.24)]"
                style={{ backgroundColor: cursor.color }}
              >
                {cursor.name} {!isCurrentPage && `(${cursor.page})`}
              </div>
            </div>
          );
        })}
      </div>
    ) : null;

  return (
    <>
      {typeof document !== "undefined"
        ? createPortal(overlay, document.body)
        : overlay}
      {typeof document !== "undefined"
        ? createPortal(toggleButton, document.body)
        : toggleButton}
    </>
  );
}
