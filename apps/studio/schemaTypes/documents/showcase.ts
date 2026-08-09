import { ProjectsIcon } from "@sanity/icons/Projects";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	type: "document",
	name: "showcase",
	title: "Showcase (prosjekt)",
	icon: ProjectsIcon,
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
			type: "portableText",
			name: "bodyText",
			title: "Brødtekst",
			description: "Hovedteksten som skal vises i artikkelen",
		}),
		defineField({
			type: "url",
			name: "github",
			title: "GitHub-lenke",
			description: "URL til Github-repo",
			placeholder: "https://github.com/{user}/{repoName}",
		}),
		defineField({
			type: "url",
			name: "projectUrl",
			title: "Lenke til prosjekt",
			description: "URL til prosjektet",
			placeholder: "https://www.lekanger.no",
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
