import { createFileRoute } from "@tanstack/react-router";
import { loadSanityQuery } from "#/lib/sanity/loader";
import { ALL_BLOGS_QUERY } from "@/lib/sanity/queries/blogPagesQuery";

export const Route = createFileRoute("/blog-page/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		const start = 0;
		const end = 4;

		return await loadSanityQuery(context, ALL_BLOGS_QUERY, {
			start,
			end,
		});
	},
});

function RouteComponent() {
	const { data } = Route.useLoaderData();
	if (!data) return <h1>404</h1>;

	return (
		<>
			<h1>Blogginnlegg</h1>
			<ul>
				{data.map((item) => (
					<li key={item._id}>
						<a href={`/blog-page/${item?.slug?.current}`}>{item.title}</a>
					</li>
				))}
			</ul>
		</>
	);
}
