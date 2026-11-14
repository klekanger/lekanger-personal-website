import {
  createFileRoute,
  notFound,
  stripSearchParams,
} from "@tanstack/react-router";
import { BlogListing } from "#/components/BlogListing";
import { PaginationComponent } from "#/components/PaginationComponent";
import { loadSanityQuery } from "#/lib/sanity/loader";
import { absoluteUrl } from "#/lib/siteConfig";
import { ALL_BLOGS_QUERY } from "@/lib/sanity/queries/blogPagesQuery";

const POSTS_PER_PAGE = 10;

export const Route = createFileRoute("/blog-page/")({
  validateSearch: (search: Record<string, unknown>): { page: number } => ({
    page: Math.max(1, Number(search.page) || 1),
  }),
  search: { middlewares: [stripSearchParams({ page: 1 })] },
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ context, deps: { page } }) => {
    const start = (page - 1) * POSTS_PER_PAGE;
    const data = await loadSanityQuery(context, ALL_BLOGS_QUERY, {
      start,
      end: start + POSTS_PER_PAGE,
    });
    if (!data?.data?.items.length || start >= data?.data?.total)
      throw notFound();

    return data;
  },
  component: RouteComponent,
  head: ({ match }) => {
    const { page } = match.search;
    const seoTitle = page > 1 ? `Blogg - Side ${page}` : "Blogg";
    const seoDescription =
      "Blogg om litt av hvert – mest koding og generell nerding";
    const url = absoluteUrl(
      page > 1 ? `/blog-page?page=${page}` : "/blog-page",
    );

    return {
      meta: [
        { title: `${seoTitle} - Kurt Lekanger` },
        { property: "og:title", content: seoTitle },
        { name: "twitter:title", content: seoTitle },
        { name: "description", content: seoDescription },
        { name: "twitter:description", content: seoDescription },
        { property: "og:description", content: seoDescription },
        { property: "og:url", content: url },
        { name: "twitter:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  const { page } = Route.useSearch();
  const { items, total } = data;
  const isLastPage = page >= Math.ceil(Number(total) / POSTS_PER_PAGE);

  return (
    <>
      <BlogListing items={items} page={page} title="Bloggen" />
      <PaginationComponent page={page} isLastPage={isLastPage} />
    </>
  );
}
