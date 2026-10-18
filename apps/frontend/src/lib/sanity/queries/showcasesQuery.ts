import { defineQuery } from "groq";

export const ALL_SHOWCASES_QUERY = defineQuery(`
  { "items": *[_type=="showcase"] | order(_createdAt desc, _id desc)[$start...$end]{
    _type,
    _id,
    _createdAt,
    _updatedAt,
    title,
    overview,
    slug
  },
"total": count(*[_type=="showcase"])
}
`);
