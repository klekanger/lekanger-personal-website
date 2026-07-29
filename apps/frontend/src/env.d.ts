/// <reference types="vite/client" />

import type {} from "@repo/shared/types/sanity.types";

declare global {
	interface ImportMetaEnv {
		readonly VITE_SANITY_DATASET: string;
		readonly VITE_SANITY_PROJECT_ID: string;
		readonly VITE_SANITY_API_VERSION: string;
		readonly VITE_SANITY_STUDIO_URL: string;
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}

	// Server-side environment variables
	namespace NodeJS {
		interface ProcessEnv {
			readonly SANITY_READ_TOKEN: string;
			readonly SANITY_PREVIEW_SECRET: string;
		}
	}
}
