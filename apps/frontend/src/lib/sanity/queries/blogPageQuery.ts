import { defineQuery } from "groq";

export const BLOGS_BY_SLUG_QUERY = defineQuery(`
  *[_type=="blog" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _updatedAt,
    mainImage,
    title,
    overview,
    body,
    "slug": slug.current
  }
`);
