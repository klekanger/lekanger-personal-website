import { ComposeIcon } from "@sanity/icons/Compose";
import { ImageIcon } from "@sanity/icons/Image";

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	type: "document",
	name: "blog",
	title: "Blogg-artikkel",
	icon: ComposeIcon,

	fieldsets: [
		{
			name: "externalBlogInfo",
			title: "Eksterne blogginnlegg",
		},
	],

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
			type: "image",
			name: "mainImage",
			title: "Hovedbilde",
			description: "Bildet som vises øverst på siden.",
			options: {
				hotspot: true,
			},
			deprecated: {
				reason:
					"Dette bildefeltet ble brukt i gamle artikler. Nå brukes en bildetype som kan gjenbrukes flere steder i stedet. ",
			},
			hidden: ({ value }) => !value,
			fields: [
				defineField({
					name: "alt",
					type: "string",
					title: "Alt-tekst",
					description:
						"Alternativ tekst til bildet, for tilgjengelighet for blinde og svaksynte.",
				}),
			],
		}),
		defineField({
			name: "topImage",
			type: "articleImage",
			title: "Hovedbilde",
			description: "Bildet som vises øverst på siden",
		}),
		defineField({
			name: "isExternalBlog",
			type: "boolean",
			title: "Blogginnlegget ligger på ekstern nettside",
			initialValue: false,
			fieldset: "externalBlogInfo",
		}),
		defineField({
			name: "externalBlogUrl",
			type: "url",
			placeholder: "https://blog.novacare.no/slik-holder-du-ai-en-i-orene/",
			hidden: ({ parent }) => parent?.isExternalBlog === false,
			fieldset: "externalBlogInfo",
		}),

		defineField({
			type: "array",
			name: "body",
			title: "Brødtekst",
			deprecated: {
				reason:
					"Dette tekstfeltet ble brukt i gamle artikler. Nå brukes en sentralisert portableText-felttype i stedet.",
			},
			hidden: ({ value }) => !value,
			description:
				"Her skriver du inn hovedteksten som skal vises i artikkelen.",
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
					type: "image",
					icon: ImageIcon,
					name: "image",
					title: "Bilde",
					options: {
						hotspot: true,
					},
					fields: [
						defineField({
							title: "Bildetekst",
							name: "caption",
							type: "string",
						}),
						defineField({
							name: "alt",
							type: "string",
							title: "Alt-tekst",
							description:
								"Alternativ tekst til bildet, for tilgjengelighet for blinde og svaksynte.",
						}),
					],
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
		}),
		defineField({
			type: "portableText",
			name: "bodyText",
			title: "Brødtekst",
			description: "Hovedteksten som skal vises i artikkelen",
			hidden: ({ parent }) => parent?.isExternalBlog === true,
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
