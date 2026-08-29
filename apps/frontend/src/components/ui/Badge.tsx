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
        "not-prose h-fit border w-fit inline-flex  items-start justify-center gap-2 shrink-0 overflow-hidden p-4 whitespace-nowrap border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        noUpperCase ? "" : "uppercase",
        subTitleUnder ? "flex-col-reverse" : "flex-col",
        className,
      )}
    >
      {subtitle && (
        <div className="text-foreground font-heading text-xs">{subtitle}</div>
      )}
      <div className="text-sm text-white font-heading">{text}</div>
    </div>
  );
}
