import { BlockElementIcon } from "@sanity/icons/BlockElement";
import { defineField, defineType } from "sanity";

export const factItem = defineType({
  name: "factItem",
  title: "Faktalinje",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "label",
      title: "Nøkkel",
      type: "string",
      description: 'For eksempel "bakgrunn", "om meg", el.l.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "value",
      title: "Verdi",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
