import { defineQuery } from "groq";

export const HOMEPAGE_QUERY = defineQuery(`
    { "blogPosts": *[_type=="blog"] | order(_createdAt desc, _id desc)[0..3]{
        _type,
        _id,
        _createdAt,
        _updatedAt,
        title,
        overview,
        isExternalBlog,
        externalBlogUrl,
        slug
      },
    "showcases": *[_type=="showcase"] | order(_createdAt desc, _id desc)[0..5]{
      ...
    },
      "heroText": *[_type=="heroText"] {
          heroTitle,
          preamble,
          facts,
          tags},
      "aboutText": *[_type=="about"] {
        title,
        body,
        topImage {
          _type,
          alt,
          caption,
          image,
          "lqip": image.asset->metadata.lqip,
          },
        facts
      },
      "settings": *[_type=="settings"] {
        companyName,
        metaDescription,
        metaKeywords,
        metaOgImage,
        metaTitle,
        gitHubAccount,
        linkedInAccount,
        twitterAccount,
        otherSocialAccount,
        phone,
        email
      }
    }
  `);
