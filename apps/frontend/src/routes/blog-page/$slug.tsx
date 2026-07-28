import { createFileRoute } from "@tanstack/react-router";
import { blogLoader } from "#/loaders/blog-page";

export const Route = createFileRoute("/blog-page/$slug")({
	component: RouteComponent,
	loader: blogLoader,
});

function RouteComponent() {
	console.log();

	return <div>Hello "/blog-page/$slug"!</div>;
}
