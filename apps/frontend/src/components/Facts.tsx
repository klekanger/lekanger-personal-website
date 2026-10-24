import type {
  FactItem,
  HeroText,
  TypewriterItem,
  UseTypeWriterOpts,
} from "@repo/shared";
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
    className="inline-block h-5 w-4 animate-c64blink bg-primary motion-reduce:animate-none"
  />
);

function FactLines({ items }: { items: TypewriterItem<Fact>[] }) {
  return (
    <>
      {items.map(
        ({ fact, visible, labelText, showValue, statusLines, showCursor }) =>
          visible ? (
            <div key={fact._key}>
              <div className="flex min-h-8 py-2 text-white uppercase">
                <span className="mr-1">{labelText}</span>
                {showCursor && !showValue && <Cursor />}
              </div>
              {statusLines.map((line) => (
                <p key={line} className="text-foreground uppercase">
                  {line}
                </p>
              ))}
              {showValue && (
                <>
                  <p className="text-foreground uppercase">{fact.value}</p>
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
      <div className="col-start-1 row-start-1" aria-hidden="true">
        <FactLines items={items} />
      </div>

      {/* SR only version */}
      <dl className="sr-only">
        {content.map((item) => (
          <div key={item._key}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
