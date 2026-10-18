import { DocumentsIcon } from "@sanity/icons/Documents";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "page",
  title: "Side",
  icon: DocumentsIcon,
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Tittel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overview",
      description:
        "Brukes som ingress og for <meta>-beskrivelses-tagen for SEO.",
      title: "Ingress",
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: "Kursiv",
                value: "em",
              },
              {
                title: "Fet skrift",
                value: "strong",
              },
            ],
          },
          styles: [],
          type: "block",
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: "topImage",
      type: "articleImage",
      title: "Hovedbilde",
      description: "Bildet som vises øverst på siden.",
    }),
    defineField({
      type: "portableText",
      name: "bodyText",
      title: "Brødtekst",
      description: "Hovedteksten som skal vises på siden",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        subtitle: "Artikkel",
        title,
      };
    },
  },
});
