import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadSanityQuery } from "@/lib/sanity/loader";
import { BLOGS_BY_SLUG_QUERY } from "@/lib/sanity/queries/blogPageQuery";
import { BlogPage } from "@/pages/BlogPage/BlogPage";

export const Route = createFileRoute("/blog-page/$slug")({
  component: BlogPage,
  loader: async ({ context, params }) => {
    const { data, ...rest } = await loadSanityQuery(
      context,
      BLOGS_BY_SLUG_QUERY,
      {
        slug: params.slug,
      },
    );

    // External blogposts are shown only on the index route, with links to the external site
    if (!data || data.isExternalBlog) {
      throw notFound();
    }

    return { data, ...rest };
  },
});
