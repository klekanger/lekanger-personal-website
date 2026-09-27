import { toPlainText } from "@portabletext/react";
import type {
  BLOGS_BY_SLUG_QUERY_RESULT,
  PROJECTS_BY_SLUG_QUERY_RESULT,
} from "@repo/shared";
import { ogImageUrl } from "@/lib/sanity/imageUtils";

type BlogPost = NonNullable<BLOGS_BY_SLUG_QUERY_RESULT>;
type Project = NonNullable<PROJECTS_BY_SLUG_QUERY_RESULT>;

export type SeoSource = Partial<
  Pick<BlogPost, "title" | "overview" | "topImage"> & Pick<Project, "excerpt">
> & {
  mainImage?: BlogPost["mainImage"] | Project["mainImage"];
  url?: string | null;
};

export function createSeoMetadataFromPost(data: SeoSource | null | undefined) {
  if (!data) {
    console.warn("No post provided");
    return { meta: [] };
  }

  // The name of the main image field has changed, need to keep
  // supporting both names to support old (legacy) articles (SEO)
  const ogImage = ogImageUrl(data.topImage?.image ?? data.mainImage);
  const ogAlt = data.topImage?.alt ?? data.mainImage?.alt;

  // Description can come from different fields depending on Sanity schema type
  // Need to still support legacy `project` schema types to render old articles (for SEO)
  let description = "";
  if (data?.overview) {
    description = toPlainText(data.overview);
  } else if (data?.excerpt) {
    description = toPlainText(data.excerpt);
  }

  return {
    meta: [
      ...(data.title ? [{ title: data.title }] : []),
      ...(description ? [{ name: "description", content: description }] : []),
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { property: "og:image:type", content: "image/jpeg" },
            ...(description
              ? [{ property: "og:description", content: description }]
              : []),
            ...(data.url ? [{ property: "og:url", content: data.url }] : []),
            ...(ogAlt ? [{ property: "og:image:alt", content: ogAlt }] : []),
          ]
        : []),
    ],
  };
}
