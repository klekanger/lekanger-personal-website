import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogListing } from "#/components/BlogListing";
import { PaginationComponent } from "#/components/PaginationComponent";
import { loadSanityQuery } from "#/lib/sanity/loader";
import { ALL_SHOWCASES_QUERY } from "@/lib/sanity/queries/showcasesQuery";
import { absoluteUrl } from "@/lib/siteConfig";

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
  head: ({ match }) => {
    const { page } = match.search;
    const seoTitle = page > 1 ? `Prosjekter - Side ${page}` : "Prosjekter";
    const seoDescription = "Mine prosjekter - hobby og kanskje litt jobb";
    const url = absoluteUrl(`/showcase?page=${page}`);

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
      <BlogListing items={items} page={page} title="Prosjekter" />
      <PaginationComponent page={page} isLastPage={isLastPage} />
    </>
  );
}
