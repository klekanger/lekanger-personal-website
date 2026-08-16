export default {
  name: "category",
  type: "document",
  title: "LEGACY Artikler - kategorier",
  deprecated: true,

  fields: [
    {
      name: "title",
      type: "string",
      title: "Tittel",
    },
    {
      name: "description",
      type: "text",
      title: "Beskrivelse",
    },
  ],
};
