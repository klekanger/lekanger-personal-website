import { SanityImage } from "#/components/SanityImage";
import { BackButton } from "#/components/ui/BackButton";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";
import { CustomPortableText } from "@/components/PortableText/CustomPortableText";
import { Route } from "@/routes/blog-page/$slug";
import { longDate } from "@/utils/dateFormatters";

export function BlogPage() {
  const { data } = Route.useLoaderData();
  if (!data) return <h1>404</h1>;

  const {
    title,
    overview,
    body,
    bodyText,
    topImage,
    mainImage,
    _createdAt,
    _updatedAt,
  } = data;

  // Field type `body` is deprecated, but we are keeping it to be able to render old articles
  // Using `bodyText` on all new articles
  const bodyTextToRender = body ? body : bodyText;

  return (
    <article className="prose py-16">
      <BackButton buttonText="Tilbake" className="mb-8" />
      <h1>{title}</h1>
      <SanityImage
        image={topImage?.image ? topImage.image : mainImage}
        alt={topImage?.alt || mainImage?.alt}
        caption={topImage?.caption || ""}
      />
      <CustomPortableText value={overview} isPreamble />
      <br />
      <CustomPortableText value={bodyTextToRender} />

      <div className="pt-8">---</div>
      <div className="py-4 text-yellow font-heading text-xs">
        PUBLISERT: {longDate(_createdAt).toUpperCase()}
      </div>
      <BackButton buttonText="Tilbake" className="my-8" />
      <BlinkingCursor />
    </article>
  );
}
