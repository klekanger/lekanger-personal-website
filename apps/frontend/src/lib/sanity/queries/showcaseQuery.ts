import { defineQuery } from "groq";

export const SHOWCASE_BY_SLUG_QUERY = defineQuery(`
    *[_type=="showcase" && slug.current == $slug][0]{
    _id,
    "publishedAt": coalesce(publishedAt, _createdAt),
    _updatedAt,
    topImage {
      ...,
      "lqip": image.asset->metadata.lqip
    },
    title,
    overview,
    bodyText[]{
      ...,
      _type == "articleImage" => { "lqip": image.asset->metadata.lqip },
      _type == "image" => { "lqip": asset->metadata.lqip },
      _type == "figure" => { "lqip": asset->metadata.lqip }
    },
    github,
    projectUrl,
    "slug": slug.current
    }
  `);
