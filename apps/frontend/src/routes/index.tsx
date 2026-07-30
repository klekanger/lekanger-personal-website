import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main>
			<h1>Her kommer det noe</h1>
		</main>
	);
}
