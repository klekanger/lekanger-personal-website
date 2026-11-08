import { defineQuery } from "groq";

export const BLOGS_BY_SLUG_QUERY = defineQuery(`
  *[_type=="blog" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _updatedAt,
    topImage {
      ...,
      "lqip": image.asset->metadata.lqip
    },
    mainImage {
      ...,
      "lqip": asset->metadata.lqip
    },
    title,
    overview,
    body[]{
      ...,
      _type == "articleImage" => { "lqip": image.asset->metadata.lqip },
      _type == "image" => { "lqip": asset->metadata.lqip },
      _type == "figure" => { "lqip": asset->metadata.lqip }
    },
    bodyText[]{
      ...,
      _type == "articleImage" => { "lqip": image.asset->metadata.lqip },
      _type == "image" => { "lqip": asset->metadata.lqip },
      _type == "figure" => { "lqip": asset->metadata.lqip }
    },
    isExternalBlog,
    externalBlogUrl,
    "slug": slug.current
  }
`);
