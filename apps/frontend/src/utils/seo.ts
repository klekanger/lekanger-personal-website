import { toPlainText } from "@portabletext/react";
import type {
  BLOGS_BY_SLUG_QUERY_RESULT,
  PROJECTS_BY_SLUG_QUERY_RESULT,
  SHOWCASE_BY_SLUG_QUERY_RESULT,
} from "@repo/shared";
import { ogImageUrl } from "@/lib/sanity/imageUtils";
import { absoluteUrl, SITE_NAME } from "@/lib/siteConfig";

type BlogPost = NonNullable<BLOGS_BY_SLUG_QUERY_RESULT>;
type Project = NonNullable<PROJECTS_BY_SLUG_QUERY_RESULT>;
type Showcase = NonNullable<SHOWCASE_BY_SLUG_QUERY_RESULT>;

export type SeoSource = {
  title?: BlogPost["title"] | Project["title"] | Showcase["title"];
  overview?: BlogPost["overview"] | Showcase["overview"];
  excerpt?: Project["excerpt"];
  topImage?: BlogPost["topImage"];
  mainImage?: BlogPost["mainImage"] | Project["mainImage"];
  _createdAt?: string;
  _updatedAt?: string;
};

function toDescription(text: Parameters<typeof toPlainText>[0]) {
  return toPlainText(text).slice(0, 160);
}

export function createSeoMetadataFromPost(
  data: SeoSource | null | undefined,
  pathname: string,
) {
  if (!data) {
    console.warn("No post provided");
    return { meta: [] };
  }

  const url = absoluteUrl(pathname);
  const title = data.title;

  // The name of the main image field has changed, need to keep
  // supporting both names to support old (legacy) articles (SEO)
  const ogImage = ogImageUrl(data.topImage?.image ?? data.mainImage);
  const ogAlt = data.topImage?.alt ?? data.mainImage?.alt ?? title;

  // Description can come from different fields depending on Sanity schema type
  // Need to still support legacy `project` schema types to render old articles (for SEO)
  let description = "";
  if (data.overview?.length) {
    description = toDescription(data.overview);
  }
  if (!description && data.excerpt?.length) {
    description = toDescription(data.excerpt);
  }

  return {
    meta: [
      ...(title
        ? [
            { title: `${title} | ${SITE_NAME}` },
            { property: "og:title", content: title },
            { name: "twitter:title", content: title },
          ]
        : []),
      ...(description
        ? [
            { name: "description", content: description },
            { property: "og:description", content: description },
            { name: "twitter:description", content: description },
          ]
        : []),
      { property: "og:url", content: url },
      { property: "og:type", content: "article" },
      ...(data._createdAt
        ? [{ property: "article:published_time", content: data._createdAt }]
        : []),
      ...(data._updatedAt
        ? [{ property: "article:modified_time", content: data._updatedAt }]
        : []),
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { property: "og:image:type", content: "image/jpeg" },
            { name: "twitter:image", content: ogImage },
            ...(ogAlt
              ? [
                  { property: "og:image:alt", content: ogAlt },
                  { name: "twitter:image:alt", content: ogAlt },
                ]
              : []),
          ]
        : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
