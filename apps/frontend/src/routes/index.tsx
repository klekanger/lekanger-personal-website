import { createFileRoute } from "@tanstack/react-router";
import { loadSanityQuery } from "#/lib/sanity/loader";
import { HOMEPAGE_QUERY } from "#/lib/sanity/queries/homepageQuery";
import { Home } from "@/pages/Home/Home";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async ({ context }) => await loadSanityQuery(context, HOMEPAGE_QUERY),
});
