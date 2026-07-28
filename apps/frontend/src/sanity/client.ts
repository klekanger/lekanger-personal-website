import { createClient } from "@sanity/client";

export const client = createClient({
	projectId: process.env.VITE_SANITY_PROJECT_ID,
	dataset: process.env.VITE_SANITY_DATASET,
	apiVersion: process.env.VITE_SANITY_API_VERSION,
	useCdn: true,
	perspective: "published",
});
