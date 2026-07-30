import { createFileRoute } from "@tanstack/react-router";
import { loadSanityQuery } from "@/lib/sanity/loader";
import { BLOGS_BY_SLUG_QUERY } from "@/lib/sanity/queries/blogPageQuery";
import { BlogPage } from "@/pages/BlogPage/BlogPage";

export const Route = createFileRoute("/blog-page/$slug")({
	component: BlogPage,
	loader: ({ context, params }) =>
		loadSanityQuery(context, BLOGS_BY_SLUG_QUERY, { slug: params.slug }),
});
