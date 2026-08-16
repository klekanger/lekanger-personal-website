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
  ],
});
