import type { ReactNode } from "react";

interface TooltipProps {
  label: string;
  children: ReactNode;
}

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <div className="group/tooltip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-40 mt-2 -translate-x-1/2 translate-y-1 rounded-md border border-line/80 bg-surface/95 px-2 py-1 text-xs text-muted opacity-0 shadow-soft transition duration-200 group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100 group-focus-within/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100"
      >
        {label}
      </span>
    </div>
  );
}
