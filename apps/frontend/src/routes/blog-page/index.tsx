import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogListing } from "#/components/BlogListing";
import { PaginationComponent } from "#/components/PaginationComponent";
import { loadSanityQuery } from "#/lib/sanity/loader";
import { ALL_BLOGS_QUERY } from "@/lib/sanity/queries/blogPagesQuery";

const POSTS_PER_PAGE = 10;

export const Route = createFileRoute("/blog-page/")({
  validateSearch: (search) => ({
    page: Math.max(1, Number(search.page) || 1),
  }),
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
  head: ({ matches }) => {
    const page = matches[1].search?.page || 1;
    return {
      meta: [
        { title: `Kurt Lekanger - Blogg - Side ${page}` },
        { name: "sdfsdfsdf" },
      ],
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
