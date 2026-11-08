import { SanityImage } from "#/components/SanityImage";
import { BackButton } from "#/components/ui/BackButton";
import PublishedTime from "#/components/ui/PublishedTime";
import { CustomPortableText } from "@/components/PortableText/CustomPortableText";
import { Route } from "@/routes/page/$slug";

export function Page() {
  const { data } = Route.useLoaderData();

  if (!data) return null;

  const { title, bodyText, overview, topImage, _createdAt, _updatedAt, slug } =
    data;

  return (
    <article className="prose default-padding">
      <header>
        <h1 style={{ viewTransitionName: `page-${slug}` }}>{title}</h1>
        <SanityImage
          image={topImage?.image}
          alt={topImage?.alt}
          caption={topImage?.caption}
        />
        <CustomPortableText value={overview} isPreamble />
      </header>

      <CustomPortableText value={bodyText} />

      <footer>
        <PublishedTime _createdAt={_createdAt} _updatedAt={_updatedAt} />
        <BackButton buttonText="Tilbake" className="my-8" />
      </footer>
    </article>
  );
}
