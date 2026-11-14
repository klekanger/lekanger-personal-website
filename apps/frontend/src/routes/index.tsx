import { createFileRoute } from "@tanstack/react-router";
import { loadSanityQuery } from "#/lib/sanity/loader";
import { HOMEPAGE_QUERY } from "#/lib/sanity/queries/homepageQuery";
import { absoluteUrl } from "@/lib/siteConfig";
import { Home } from "@/pages/Home/Home";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async ({ context }) => await loadSanityQuery(context, HOMEPAGE_QUERY),
  head: () => ({ links: [{ rel: "canonical", href: absoluteUrl("/") }] }),
});
