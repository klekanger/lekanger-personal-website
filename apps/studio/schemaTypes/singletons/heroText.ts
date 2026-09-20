import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "heroText",
  title: "C64 loading text",
  icon: HomeIcon,
  description: "Teksten som skal vises i Hero-seksjonen på forsiden",
  fields: [
    defineField({
      name: "heroTitle",
      type: "string",
      title: "Overskrift",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "preamble",
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
      validation: (rule) => rule.max(200).required(),
    }),
    defineField({
      name: "tags",
      title: "tagger",
      type: "array",
      of: [defineArrayMember({ name: "tag", title: "tag", type: "string" })],
    }),
    defineField({
      name: "facts",
      title: "Faktainformasjon til Hero",
      type: "array",
      of: [defineArrayMember({ type: "factItem" })],
      validation: (rule) =>
        rule.custom((items?: { label?: string }[]) => {
          const labels = (items ?? []).map((i) =>
            i.label?.trim().toLowerCase(),
          );
          const dupes = labels.filter((l, i) => l && labels.indexOf(l) !== i);
          return dupes.length ? `Duplikat nøkkel: ${dupes[0]}` : true;
        }),
    }),
  ],
});
