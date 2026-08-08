import { CustomPortableText } from "@/components/PortableText/PortableText";
import { Route } from "@/routes/blog-page/$slug";

export function BlogPage() {
	const { data } = Route.useLoaderData();

	if (!data) return <h1>404</h1>;

	const { title, body } = data;

	return (
		<article className="prose pt-16">
			<h1>{title}</h1>
			<CustomPortableText value={body} />
		</article>
	);
}
