import { defineQuery } from "groq";

export const SHOWCASE_BY_SLUG_QUERY = defineQuery(`
    *[_type=="showcase" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _updatedAt,
    mainImage,
    title,
    overview,
    bodyText,
    github,
    projectUrl,
    "slug": slug.current
    }
  `);
