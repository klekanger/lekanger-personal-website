import { defineQuery } from "groq";

export const BLOGS_BY_SLUG_QUERY = defineQuery(`
  *[_type=="blog" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _updatedAt,
    topImage,
    mainImage,
    title,
    overview,
    body,
    bodyText,
    isExternalBlog,
    externalBlogUrl,
    "slug": slug.current
  }
`);
