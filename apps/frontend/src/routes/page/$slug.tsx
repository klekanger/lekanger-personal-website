import { createFileRoute, notFound } from "@tanstack/react-router";
import { Page } from "#/pages/Page/Page.tsx";
import { createSeoMetadataFromPost } from "#/utils/seo";
import { loadSanityQuery } from "@/lib/sanity/loader";
import { PAGE_BY_SLUG_QUERY } from "@/lib/sanity/queries/pageQuery";

export const Route = createFileRoute("/page/$slug")({
  component: Page,
  loader: async ({ context, params }) => {
    const data = await loadSanityQuery(context, PAGE_BY_SLUG_QUERY, {
      slug: params.slug,
    });

    if (!data?.data) throw notFound();

    return data;
  },
  head: ({ loaderData, match }) => {
    const page = loaderData?.data;

    return createSeoMetadataFromPost(page, match.pathname);
  },
});
