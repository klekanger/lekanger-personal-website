import { defineQuery } from "groq";

export const SITEMAP_QUERY = defineQuery(`
  *[_type in ["page", "blog", "project", "showcase"]
        && defined(slug.current)
        && !(_type == "blog" && isExternalBlog == true)
      ]{
      _type,
      "slug": slug.current,
      _updatedAt
  }
`);
