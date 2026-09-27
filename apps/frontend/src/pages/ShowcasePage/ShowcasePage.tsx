import { SanityImage } from "#/components/SanityImage";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";
import { CustomPortableText } from "@/components/PortableText/CustomPortableText";
import { Route } from "@/routes/showcase/$slug";

export function ShowcasePage() {
  const { data } = Route.useLoaderData();

  if (!data) return <h1>404</h1>;

  const { title, bodyText, overview, topImage } = data;

  return (
    <article className="prose py-16">
      <h1>{title}</h1>
      <SanityImage
        image={topImage?.image}
        alt={topImage?.alt}
        caption={topImage?.caption}
      />
      <CustomPortableText value={overview} isPreamble />
      <br />
      <CustomPortableText value={bodyText} />
      <BlinkingCursor />
    </article>
  );
}
