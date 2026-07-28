import type { QueryClient } from "@tanstack/react-query";

export const blogLoader = async () => {
	console.log("called blog-page loader");

	return "test";
};
