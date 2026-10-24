import type { ReactElement } from "react";

interface TooltipProps {
  title: string;
  children?: ReactElement;
}

export default function Tooltip(props: TooltipProps) {
  const { title, children } = props;
  if (!title) return null;

  return (
    <span className="group relative" aria-hidden="true">
      {children}
      <div
        role="tooltip"
        className="left pointer-events-none absolute bottom-full mb-2 w-max -translate-y-0.5 rounded-md bg-foreground px-2 py-1 font-mono text-background text-xs opacity-0 transition-all group-hover:-translate-y-1 group-hover:opacity-100"
      >
        {title}
        <span className="absolute top-full left-1.5 size-2 -translate-y-1/2 rotate-45 bg-foreground" />
      </div>
    </span>
  );
}
