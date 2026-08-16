import { BlinkingCursor } from "#/components/ui/BlinkingCursor";
import { CustomPortableText } from "@/components/PortableText/PortableText";
import { Route } from "@/routes/blog-page/$slug";

export function BlogPage() {
  const { data } = Route.useLoaderData();
  if (!data) return <h1>404</h1>;

  const { title, overview, body, bodyText } = data;

  // Field type `body` is deprecated, but we are keeping it to be able to render old articles
  // Using `bodyText` on all new articles
  const bodyTextToRender = body ? body : bodyText;

  return (
    <article className="prose py-16">
      <h1>{title}</h1>
      <CustomPortableText value={overview} isPreamble />
      <br />
      <CustomPortableText value={bodyTextToRender} />
      <BlinkingCursor />
    </article>
  );
}
