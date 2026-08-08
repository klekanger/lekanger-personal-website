import { DocumentIcon } from "@sanity/icons/Document";
import { defineType } from "sanity";

export default defineType({
	name: "project",
	title: "LEGACY Artikler",
	type: "document",
	icon: DocumentIcon,
	deprecated: {
		reason:
			"Artikler/prosjekter fra gammel webside. Beholdt for at innholdet skal være tilgjengelig fortsatt på web, men innholdet skal ikke lenger frontes på ny nettside.",
	},
	fields: [
		{
			name: "title",
			title: "Tittel",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			description: 'Alle artikler må ha en "slug" for å lage en unik URL.',
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (rule) => rule.required(),
		},
		{
			name: "publishedAt",
			title: "Publiseringstidspunkt",
			description:
				"Du kan bruke dette feltet til å forhåndspublisere artikler.",
			type: "datetime",
		},
		{
			name: "pinned",
			title: "Pinned",
			type: "boolean",
		},
		{
			name: "excerpt",
			title: "Kort oppsummering",
			type: "simplePortableText",
		},
		{
			name: "author",
			title: "Forfatter",
			type: "array",
			of: [{ type: "reference", to: { type: "author" } }],
		},

		{
			name: "mainImage",
			title: "Hovedbilde",
			type: "figure",
		},
		{
			name: "categories",
			title: "Kategorier",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
		},
		{
			name: "body",
			title: "Brødtekst",
			type: "projectPortableText",
		},
		{
			name: "relatedProjects",
			title: "Relaterte artikler",
			type: "array",
			of: [{ type: "reference", to: { type: "project" } }],
		},
		{
			name: "keywords",
			type: "array",
			title: "Emneknagger",
			description: "Emneknagger som beskriver artikkelen",
			of: [{ type: "string" }],
			options: {
				layout: "tags",
			},
		},
	],
	preview: {
		select: {
			title: "title",
			publishedAt: "publishedAt",
			slug: "slug",
			media: "mainImage",
		},
		prepare({ title }) {
			return {
				title,
				subtitle: "Legacy artikkel",
			};
		},
	},
});
