import { toPlainText } from "@portabletext/react";
import type { Showcase } from "@repo/shared/types/sanity.types";
import { Link } from "@tanstack/react-router";

interface ShowcaseCardProps {
  showcase: Showcase;
  headingAs?: "h2" | "h3";
}
export function ShowcaseCard(props: ShowcaseCardProps) {
  const { showcase, headingAs: HeadingTag = "h2" } = props;
  if (!showcase) return null;

  const fullPreamble = showcase?.overview ? toPlainText(showcase.overview) : "";
  const preamble =
    fullPreamble?.length > 120
      ? `${fullPreamble.slice(0, 120)}...`
      : fullPreamble;

  const showcaseUrl = `/showcase/${showcase?.slug?.current}` || "#";

  return (
    <article className="relative flex w-full flex-col gap-1 border border-foreground p-4 hover:cursor-pointer hover:border-white hover:bg-accent md:min-h-72">
      <HeadingTag
        className="text-base text-white md:text-xl"
        style={{ viewTransitionName: `post-${showcase.slug?.current}` }}
      >
        <Link to={showcaseUrl} className="after:absolute after:inset-0">
          {showcase?.title}
        </Link>
      </HeadingTag>
      <p className="grow pt-2 font-mono">{preamble}</p>
      <p
        className="pt-2 font-mono font-normal! text-sm text-white uppercase"
        aria-hidden="true"
      >
        {`> Åpne prosjekt`}
      </p>
    </article>
  );
}
