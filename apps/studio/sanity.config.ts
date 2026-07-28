import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
	name: "default",
	title: "Lekanger tekst og kode",

	dataset: process.env.SANITY_STUDIO_DATASET ?? "",
	projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",

	plugins: [structureTool(), visionTool(), codeInput()],

	schema: {
		types: schemaTypes,
	},
});
