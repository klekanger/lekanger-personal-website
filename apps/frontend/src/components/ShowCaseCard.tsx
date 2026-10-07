import { toPlainText } from "@portabletext/react";
import type { Showcase } from "@repo/shared/types/sanity.types";
import { Link } from "@tanstack/react-router";

export function ShowCaseCard(props: { showcase: Showcase }) {
  const { showcase } = props;
  if (!showcase) return null;

  const fullPreamble = showcase?.overview ? toPlainText(showcase.overview) : "";
  const preamble =
    fullPreamble?.length > 120
      ? `${fullPreamble.slice(0, 120)}...`
      : fullPreamble;

  const showcaseUrl = `/showcase/${showcase?.slug?.current}` || "#";

  return (
    <div className="w-full border border-foreground p-4 flex flex-col gap-1 hover:cursor-pointer hover:bg-accent hover:border-white min-h-72">
      <Link to={showcaseUrl}>
        <h3
          className="text-xl text-white"
          style={{ viewTransitionName: `post-${showcase.slug?.current}` }}
        >
          {showcase?.title}
        </h3>
        <p className="font-mono grow">{preamble}</p>
        <p className="font-mono text-white uppercase text-sm font-normal!">
          {`> Åpne prosjekt`}
        </p>
      </Link>
    </div>
  );
}
