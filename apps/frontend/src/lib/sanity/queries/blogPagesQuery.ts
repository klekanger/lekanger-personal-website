import { defineQuery } from "groq";

export const ALL_BLOGS_QUERY = defineQuery(`
  { "items": *[_type=="blog"] | order(_createdAt desc, _id desc)[$start...$end]{
    _id,
    _createdAt,
    _updatedAt,
    title,
    overview,
    isExternalBlog,
    externalBlogUrl,
    slug
  },
"total": count(*[_type=="blog"])
}
`);
