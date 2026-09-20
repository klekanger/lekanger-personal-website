import type { HeroText, TypewriterItem, UseTypeWriterOpts } from "@repo/shared";
import { useTypewriterSequence } from "#/hooks/useTypewriter";
import { cn } from "#/lib/utils";

interface TypeWriterProps extends UseTypeWriterOpts {
  content: HeroText["facts"] | null;
  className?: string;
}

type Fact = NonNullable<HeroText["facts"]>[number];

const NO_FACTS: NonNullable<HeroText["facts"]> = [];

const Cursor = () => (
  <span
    aria-hidden="true"
    className="inline-block w-4 h-5 bg-primary animate-c64blink motion-reduce:animate-none"
  />
);

function FactLines({ items }: { items: TypewriterItem<Fact>[] }) {
  return (
    <>
      {items.map(
        ({ fact, visible, labelText, showValue, statusLines, showCursor }) =>
          visible ? (
            <div key={fact._key}>
              <div className="uppercase text-white h-8 flex py-2">
                <span className="mr-1">{labelText}</span>
                {showCursor && !showValue && <Cursor />}
              </div>
              {statusLines.map((line) => (
                <p key={line} className="uppercase text-foreground">
                  {line}
                </p>
              ))}
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
    </>
  );
}

export function Facts({ content, className, ...opts }: TypeWriterProps) {
  const { items, finalItems } = useTypewriterSequence(
    content ?? NO_FACTS,
    opts,
  );
  if (!content?.length) return null;

  return (
    <div className={cn("grid font-heading", className)}>
      <div aria-hidden="true" className="invisible col-start-1 row-start-1">
        <FactLines items={finalItems} />
      </div>
      <div className="col-start-1 row-start-1">
        <FactLines items={items} />
      </div>
    </div>
  );
}
