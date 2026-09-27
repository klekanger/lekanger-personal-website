import { SanityImage } from "#/components/SanityImage";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";
import { CustomPortableText } from "@/components/PortableText/CustomPortableText";
import { Route } from "@/routes/showcase/$slug";

export function ShowcasePage() {
  const { data } = Route.useLoaderData();

  if (!data) return <h1>404</h1>;

  const {
    title,
    bodyText,
    overview,
    _createdAt,
    _updatedAt,
    github,
    mainImage,
    projectUrl,
  } = data;

  return (
    <article className="prose py-16">
      <h1>{title}</h1>
      <SanityImage
        image={mainImage}
        alt={mainImage?.alt}
        caption={mainImage?.caption}
      />
      <CustomPortableText value={overview} isPreamble />
      <br />
      <CustomPortableText value={bodyText} />
      <BlinkingCursor />
    </article>
  );
}
