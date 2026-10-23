import type { ReactElement } from "react";

interface TooltipProps {
  title: string;
  children?: ReactElement;
}

export default function Tooltip(props: TooltipProps) {
  const { title, children } = props;
  if (!title) return null;

  return (
    <span className="relative group" aria-hidden="true">
      {children}
      <div
        role="tooltip"
        className="bottom-full left absolute
      text-background font-mono bg-foreground text-xs opacity-0 px-2 py-1 mb-2 rounded-md w-max -translate-y-0.5 group-hover:-translate-y-1 group-hover:opacity-100 transition-all"
      >
        Ekstern lenke
        <span className="absolute top-full left-1.5 size-2 -translate-y-1/2 rotate-45 bg-foreground" />
      </div>
    </span>
  );
}
