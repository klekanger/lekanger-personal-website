import { defineQuery } from "groq";

export const PAGE_BY_SLUG_QUERY = defineQuery(`
    *[_type=="page" && slug.current == $slug][0]{
    _id,
    _createdAt,
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
    "slug": slug.current,
    }
  `);
