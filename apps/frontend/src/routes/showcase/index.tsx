import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogListingPage } from "#/components/BlogListingPage";
import { PaginationComponent } from "#/components/PaginationComponent";
import { loadSanityQuery } from "#/lib/sanity/loader";
import { ALL_SHOWCASES_QUERY } from "@/lib/sanity/queries/showcasesQuery";

const POSTS_PER_PAGE = 10;

export const Route = createFileRoute("/showcase/")({
  validateSearch: (search) => ({
    page: Math.max(1, Number(search.page) || 1),
  }),
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ context, deps: { page } }) => {
    const start = (page - 1) * POSTS_PER_PAGE;
    const data = await loadSanityQuery(context, ALL_SHOWCASES_QUERY, {
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
      <BlogListingPage items={items} page={page} title="Prosjekter" />
      <PaginationComponent page={page} isLastPage={isLastPage} />
    </>
  );
}
