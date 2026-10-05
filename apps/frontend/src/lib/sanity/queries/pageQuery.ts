import { defineQuery } from "groq";

export const PAGE_BY_SLUG_QUERY = defineQuery(`
    *[_type=="page" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _updatedAt,
    topImage,
    title,
    overview,
    bodyText,
    "slug": slug.current,
    }
  `);
