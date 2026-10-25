import { defineArrayMember, defineField, defineType } from "sanity";
import { ArticleImage } from "../../customInputComponents/articleImage";

export const portableText = defineType({
  name: "portableText",
  title: "Portable Text",
  type: "array",
  of: [
    // Paragraphs
    defineArrayMember({
      type: "block",

      marks: {
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Lenke",
            fields: [
              {
                name: "href",
                type: "url",
                title: "Url",
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                    allowRelative: true,
                  }),
              },
            ],
          },
        ],
      },
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2 - Ekstra stor", value: "h2" },
        { title: "H3 - Stor", value: "h3" },
        { title: "H4 - Middels", value: "h4" },
        { title: "Sitat", value: "blockquote" },
      ],

      lists: [
        { title: "Punktliste", value: "bullet" },
        { title: "Nummerert liste", value: "number" },
      ],
    }),
    // Custom blocks

    defineField({
      type: "articleImage",
      name: "articleImage",
      title: "Bilde",
      components: {
        block: ArticleImage,
      },
    }),
    defineField({
      type: "youtube",
      name: "YouTube",
      description: "Sett inn YouTube-video.",
    }),
    defineField({
      type: "twitter",
      name: "Twitter",
      description: "Sett inn Twitter-tweet.",
    }),
    defineField({
      type: "code",
      name: "code",
      title: "Sett inn kodesnutt",
      options: {
        language: "javascript",
      },
    }),
    defineField({
      type: "code",
      name: "htmlEmbed",
      title: "HTML/script-innhold",
      description: "Lim inn HTML eller script som skal vises i en iframe.",
      options: {
        language: "html",
        languageAlternatives: [
          { title: "HTML", value: "html" },
          { title: "JavaScript", value: "javascript" },
        ],
      },
    }),
  ],
});
