import { SanityImage } from "#/components/SanityImage";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";
import { CustomPortableText } from "@/components/PortableText/CustomPortableText";
import { Route } from "@/routes/project/$slug";

export function ProjectPage() {
  const { data } = Route.useLoaderData();
  if (!data) return <h1>404</h1>;

  const { title, excerpt, body, mainImage } = data;

  return (
    <article className="prose py-16">
      <h1>{title}</h1>
      <SanityImage
        image={mainImage}
        alt={mainImage?.alt}
        caption={mainImage?.caption}
      />
      <CustomPortableText value={excerpt} isPreamble />
      <br />
      <CustomPortableText value={body} />
      <BlinkingCursor />
    </article>
  );
}
