/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SANITY_DATASET: string;
	readonly VITE_SANITY_PROJECT_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// Server-side environment variables
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly SANITY_API_READ_TOKEN: string;
			readonly SANITY_PREVIEW_SECRET;
		}
	}
}

export {};
