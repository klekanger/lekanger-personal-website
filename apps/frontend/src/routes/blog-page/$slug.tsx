import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadSanityQuery } from "@/lib/sanity/loader";
import { BLOGS_BY_SLUG_QUERY } from "@/lib/sanity/queries/blogPageQuery";
import { BlogPage } from "@/pages/BlogPage/BlogPage";
import { createSeoMetadataFromPost } from "@/utils/seo";

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

    if (!data || data.isExternalBlog) {
      throw notFound();
    }

    return { data, ...rest };
  },
  head: ({ loaderData, match }) => {
    const blogPost = loaderData?.data;

    return createSeoMetadataFromPost(blogPost, match.pathname);
  },
});
