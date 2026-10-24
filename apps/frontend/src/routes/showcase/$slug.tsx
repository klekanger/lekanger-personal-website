import { createFileRoute, notFound } from "@tanstack/react-router";
import { ShowcasePage } from "#/pages/ShowcasePage/ShowcasePage";
import { createSeoMetadataFromPost } from "#/utils/seo";
import { loadSanityQuery } from "@/lib/sanity/loader";
import { SHOWCASE_BY_SLUG_QUERY } from "@/lib/sanity/queries/showcaseQuery";

export const Route = createFileRoute("/showcase/$slug")({
  component: ShowcasePage,
  loader: async ({ context, params }) => {
    const data = await loadSanityQuery(context, SHOWCASE_BY_SLUG_QUERY, {
      slug: params.slug,
    });

    if (!data?.data) throw notFound();

    return data;
  },
  head: ({ loaderData, match }) => {
    const showcase = loaderData?.data;

    return createSeoMetadataFromPost(showcase, match.pathname);
  },
});
