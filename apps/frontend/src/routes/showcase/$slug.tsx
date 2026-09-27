import { createFileRoute } from "@tanstack/react-router";
import { Showcase } from "#/pages/Showcase/Showcase";
import { createSeoMetadataFromPost } from "#/utils/seo";
import { loadSanityQuery } from "@/lib/sanity/loader";
import { SHOWCASE_BY_SLUG_QUERY } from "@/lib/sanity/queries/showcaseQuery";

export const Route = createFileRoute("/showcase/$slug")({
  component: Showcase,
  loader: async ({ context, params }) =>
    await loadSanityQuery(context, SHOWCASE_BY_SLUG_QUERY, {
      slug: params.slug,
    }),
  head: ({ loaderData }) => {
    const showcase = loaderData?.data;

    return createSeoMetadataFromPost(showcase);
  },
});
