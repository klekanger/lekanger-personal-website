import { defineHandler } from "nitro";
import { client } from "@/lib/sanity/client";
import { SITEMAP_QUERY } from "@/lib/sanity/queries/sitemapQuery";
import { absoluteUrl } from "@/lib/siteConfig";

const prefixes = {
  page: "page",
  blog: "blog-page",
  project: "project",
  showcase: "showcase",
} as const;

const staticPaths = ["/", "/blog-page", "/showcase"];

export default defineHandler(async (event) => {
  const sitemapData = await client.fetch(SITEMAP_QUERY);

  const staticUrls = staticPaths.map(
    (path) => `<url><loc>${absoluteUrl(path)}</loc></url>`,
  );

  const documentUrls = sitemapData.map(
    (item) =>
      `<url><loc>${absoluteUrl(`/${prefixes[item._type]}/${item.slug}`)}</loc><lastmod>${item._updatedAt}</lastmod></url>`,
  );

  event.res.headers.set("Content-Type", "application/xml");

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${[...staticUrls, ...documentUrls].join("\n")}
    </urlset>`;
});
