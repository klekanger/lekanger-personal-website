import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const helloFromServer = createServerFn().handler(async () => {
	return "Hello from the server";
});

export const Route = createFileRoute("/project/$slug")({
	loader: async ({ params }) => {
		const helloMsg = await helloFromServer();
		return { helloMsg, slug: params.slug };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { helloMsg } = Route.useLoaderData();

	return (
		<div>
			<div>Message: {helloMsg}</div>
		</div>
	);
}
