import { createFileRoute, notFound } from "@tanstack/react-router";
import { createSeoMetadataFromPost } from "#/utils/seo";
import { loadSanityQuery } from "@/lib/sanity/loader";
import { PROJECTS_BY_SLUG_QUERY } from "@/lib/sanity/queries/projectPageQuery";
import { ProjectPage } from "@/pages/ProjectPage/ProjectPage";

export const Route = createFileRoute("/project/$slug")({
  component: ProjectPage,
  loader: async ({ context, params }) => {
    const data = await loadSanityQuery(context, PROJECTS_BY_SLUG_QUERY, {
      slug: params.slug,
    });

    if (!data?.data) throw notFound();

    return data;
  },
  head: ({ loaderData, match }) => {
    const project = loaderData?.data;

    return createSeoMetadataFromPost(project, match.pathname);
  },
});
