import { toPlainText } from "@portabletext/react";
import type {
  BLOGS_BY_SLUG_QUERY_RESULT,
  PROJECTS_BY_SLUG_QUERY_RESULT,
  SHOWCASE_BY_SLUG_QUERY_RESULT,
} from "@repo/shared";
import { ogImageUrl } from "@/lib/sanity/imageUtils";
import { absoluteUrl } from "@/lib/siteConfig";

type BlogPost = NonNullable<BLOGS_BY_SLUG_QUERY_RESULT>;
type Project = NonNullable<PROJECTS_BY_SLUG_QUERY_RESULT>;
type Showcase = NonNullable<SHOWCASE_BY_SLUG_QUERY_RESULT>;

export type SeoSource = {
  title?: BlogPost["title"] | Project["title"] | Showcase["title"];
  overview?: BlogPost["overview"] | Showcase["overview"];
  excerpt?: Project["excerpt"];
  topImage?: BlogPost["topImage"];
  mainImage?: BlogPost["mainImage"] | Project["mainImage"];
  publishedAt?: string;
  _createdAt?: string;
  _updatedAt?: string;
};

const MAX_DESCRIPTION_LENGTH = 160;

function toDescription(text: Parameters<typeof toPlainText>[0]) {
  const plainText = toPlainText(text).replace(/\s+/g, " ").trim();
  if (plainText.length <= MAX_DESCRIPTION_LENGTH) return plainText;

  const cut = plainText.slice(0, MAX_DESCRIPTION_LENGTH - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…`;
}

export function createSeoMetadataFromPost(
  data: SeoSource | null | undefined,
  pathname: string,
  { type = "article" }: { type?: "article" | "website" } = {},
) {
  if (!data) {
    console.warn("No post provided");
    return { meta: [] };
  }

  const url = absoluteUrl(pathname);
  const authorUrl = absoluteUrl("/page/om-meg");
  const title = data.title;
  const isArticle = type === "article";
  const publishedAt = data.publishedAt ?? data._createdAt;

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
            { title: `${title} - Kurt Lekanger` },
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
      { property: "og:type", content: type },
      ...(isArticle && publishedAt
        ? [{ property: "article:published_time", content: publishedAt }]
        : []),
      ...(isArticle && data._updatedAt
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

      ...(isArticle
        ? [
            {
              "script:ld+json": {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: title,
                description: description,
                image: ogImage,
                datePublished: publishedAt,
                dateModified: data._updatedAt,
                url: url,
                author: {
                  "@type": "Person",
                  name: "Kurt Lekanger",
                  url: authorUrl,
                },
              },
            },
          ]
        : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
