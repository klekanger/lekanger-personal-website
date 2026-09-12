import type { HeroText } from "@repo/shared";
import {
  type UseTypeWriterOpts,
  useTypewriterSequence,
} from "#/hooks/useTypewriter";
import { cn } from "#/lib/utils";

interface TypeWriterProps extends UseTypeWriterOpts {
  content: HeroText["facts"] | null;
  className?: string;
}

const NO_FACTS: NonNullable<HeroText["facts"]> = [];

const Cursor = () => (
  <span
    aria-hidden="true"
    className="inline-block w-4 h-5 bg-primary animate-c64blink motion-reduce:animate-none"
  />
);

export function Facts({ content, className, ...opts }: TypeWriterProps) {
  const { items, phase } = useTypewriterSequence(content ?? NO_FACTS, opts);
  if (!content?.length) return null;

  return (
    <div className={cn("font-heading", className)}>
      {items.map(({ fact, visible, labelText, showValue, showCursor }) =>
        visible ? (
          <div key={fact._key}>
            <div className="uppercase text-white h-8 flex align-middle py-2">
              <span className="mr-1 ">{labelText}</span>
              {showCursor && !showValue && <Cursor />}
            </div>
            {showValue && (
              <>
                <p className="uppercase text-foreground">{fact.value}</p>
                <p className="text-foreground">READY.</p>
                {showCursor && <Cursor />}
              </>
            )}
          </div>
        ) : null,
      )}
      {phase === "done" && <Cursor />}
    </div>
  );
}
