import { defineQuery } from "groq";

export const PROJECTS_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    mainImage {
      ...,
      "lqip": asset->metadata.lqip
    },
    excerpt,
    slug,
    title,
    _createdAt,
    _updatedAt,
    _id,
    body[]{
      ...,
      _type == "articleImage" => { "lqip": image.asset->metadata.lqip },
      _type == "image" => { "lqip": asset->metadata.lqip },
      _type == "figure" => { "lqip": asset->metadata.lqip }
    },
  }
`);
