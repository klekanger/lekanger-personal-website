import { cn } from "@/lib/utils";

interface BadgeProps {
  text: string;
  subtitle?: string;
  className?: string;
  noUpperCase?: boolean;
  subTitleUnder?: boolean;
}

/**
 * Reusable Badge component - C64 look
 *
 * @param text - The text to display in the badge
 * @param subtitle - Optional subtitle to display above or under the text
 * @param noUpperCase - Optional flag to disable uppercase transformation of text
 * @param subTitleUnder - Show the subtitle under instead of above the main text
 * @param className - Optional additional CSS classes
 *
 */
export function Badge(props: BadgeProps) {
  const { text, subtitle, className, noUpperCase, subTitleUnder } = props;

  return (
    <div
      className={cn(
        "not-prose inline-flex w-fit shrink-0 items-start justify-start gap-2 overflow-hidden border border-border p-4 text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        noUpperCase ? "" : "uppercase",
        subTitleUnder ? "flex-col-reverse" : "flex-col",
        className,
      )}
    >
      {subtitle && (
        <div className="font-heading text-foreground text-xs">{subtitle}</div>
      )}
      <div className="wrap-break-word font-mono text-sm text-white">{text}</div>
    </div>
  );
}
