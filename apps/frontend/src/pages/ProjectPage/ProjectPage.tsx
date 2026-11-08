import { SanityImage } from "#/components/SanityImage";
import { BackButton } from "#/components/ui/BackButton";
import PublishedTime from "#/components/ui/PublishedTime";
import { CustomPortableText } from "@/components/PortableText/CustomPortableText";
import { Route } from "@/routes/project/$slug";

export function ProjectPage() {
  const { data } = Route.useLoaderData();
  if (!data) return null;
  const { title, excerpt, body, mainImage, _createdAt, _updatedAt } = data;

  return (
    <article className="prose default-padding">
      <header>
        <h1>{title}</h1>
        <SanityImage
          image={mainImage}
          alt={mainImage?.alt}
          lqip={mainImage?.lqip}
          caption={mainImage?.caption}
        />

        <CustomPortableText value={excerpt} isPreamble />
      </header>

      <CustomPortableText value={body} className="pt-2 lg:pt-8" />

      <footer>
        <PublishedTime _createdAt={_createdAt} _updatedAt={_updatedAt} />
        <BackButton buttonText="Tilbake" className="my-8" />
      </footer>
    </article>
  );
}
