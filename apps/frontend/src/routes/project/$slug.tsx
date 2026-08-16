import { createFileRoute } from "@tanstack/react-router";
import { loadSanityQuery } from "@/lib/sanity/loader";
import { PROJECTS_BY_SLUG_QUERY } from "@/lib/sanity/queries/projectPageQuery";
import { ProjectPage } from "@/pages/ProjectPage/ProjectPage";

export const Route = createFileRoute("/project/$slug")({
  component: ProjectPage,
  loader: async ({ context, params }) =>
    await loadSanityQuery(context, PROJECTS_BY_SLUG_QUERY, {
      slug: params.slug,
    }),
});
