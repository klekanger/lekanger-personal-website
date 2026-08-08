import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const articleImage = defineType({
	name: "articleImage",
	type: "object",
	icon: ImageIcon,
	fields: [
		defineField({
			name: "image",
			type: "image",
			title: "Bilde",
			description: "Bildet som skal vises",
			options: {
				hotspot: true,
			},
			validation: (rule) => rule.required().error("Du må velge et bilde"),
		}),
		defineField({
			name: "caption",
			type: "string",
			title: "Bildetekst",
		}),
		defineField({
			name: "alt",
			type: "string",
			title: "Alt-tekst",
			description:
				"Alternativ tekst til bildet, for tilgjengelighet for blinde og svaksynte.",
			validation: (rule) =>
				rule.required().error("Du må skrive inn en alt-tekst"),
		}),
		defineField({
			name: "credits",
			type: "string",
			title: "Bildekreditering (fotograf)",
		}),
	],
});
