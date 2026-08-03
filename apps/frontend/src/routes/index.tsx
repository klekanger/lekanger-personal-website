import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main className="prose lg:prose-lg">
			<h1>Her kommer det noe</h1>
			<p>Dette er brødteksten </p>
		</main>
	);
}
