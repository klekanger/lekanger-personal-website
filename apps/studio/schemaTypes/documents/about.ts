import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "Om meg",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      type: "portableText",
      name: "body",
      title: "Brødtekst",
    }),

    defineField({
      name: "topImage",
      type: "articleImage",
      title: "Hovedbilde",
      description: "Bildet som vises i Om meg-boksen",
    }),

    defineField({
      name: "facts",
      title: "Faktainformasjon til Om meg-boksen",
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
