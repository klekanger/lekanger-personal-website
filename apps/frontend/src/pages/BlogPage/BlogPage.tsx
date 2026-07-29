import { Route } from "@/routes/blog-page/$slug";

export function BlogPage() {
	const { data } = Route.useLoaderData();

	if (!data) return <h1>404</h1>;

	const { title } = data;

	return (
		<section>
			<h1>{title}</h1>
		</section>
	);
}
