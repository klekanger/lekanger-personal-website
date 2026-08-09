import { createFileRoute } from "@tanstack/react-router";
import { Showcase } from "#/pages/Showcase/Showcase";
import { loadSanityQuery } from "@/lib/sanity/loader";
import { SHOWCASE_BY_SLUG_QUERY } from "@/lib/sanity/queries/showcaseQuery";

export const Route = createFileRoute("/showcase/$slug")({
	component: Showcase,
	loader: ({ context, params }) =>
		loadSanityQuery(context, SHOWCASE_BY_SLUG_QUERY, { slug: params.slug }),
});
