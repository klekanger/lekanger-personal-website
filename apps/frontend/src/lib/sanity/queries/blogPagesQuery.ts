import { defineQuery } from "groq";

export const ALL_BLOGS_QUERY = defineQuery(`
  { "items": *[_type=="blog"] | order(coalesce(publishedAt, _createdAt) desc, _id desc)[$start...$end]{
    _type,
    _id,
    "publishedAt": coalesce(publishedAt, _createdAt),
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
