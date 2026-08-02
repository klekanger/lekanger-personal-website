import { defineQuery } from "groq";

export const PROJECTS_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    mainImage,  
    excerpt,
    slug,
    title,
    _createdAt,
    _updatedAt,
    _id,
    body,
  }
`);
