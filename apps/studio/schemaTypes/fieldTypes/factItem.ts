import { BlockElementIcon } from "@sanity/icons/BlockElement";
import { defineArrayMember, defineField, defineType } from "sanity";

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

    defineField({
      name: "c64command",
      title: "C64-kommando",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "LOAD", value: "c64Load" },
          { title: "PRINT", value: "c64Print" },
          { title: "Ingen", value: "c64NoCommand" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
