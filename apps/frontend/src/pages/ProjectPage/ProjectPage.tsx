import { BlinkingCursor } from "#/components/ui/BlinkingCursor";
import { CustomPortableText } from "@/components/PortableText/PortableText";
import { Route } from "@/routes/project/$slug";

export function ProjectPage() {
	const { data } = Route.useLoaderData();

	if (!data) return <h1>404</h1>;

	const { title, body } = data;

	return (
		<article className="prose py-16">
			<h1>{title}</h1>
			<CustomPortableText value={body} />
			<BlinkingCursor />
		</article>
	);
}
