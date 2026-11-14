import { Link } from "@tanstack/react-router";
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
        <Link
          to="/"
          className="px-1 py-1 font-heading text-white uppercase no-underline hover:bg-foreground hover:text-background"
        >
          &lt; Forsiden
        </Link>
        <h1
          style={{ viewTransitionName: `page-${slug}` }}
          className="hyphens-auto pt-8 text-2xl text-white md:text-4xl"
        >
          {title}
        </h1>
        <SanityImage
          image={topImage?.image}
          alt={topImage?.alt}
          lqip={topImage?.lqip}
          caption={topImage?.caption}
          className="pb-8"
        />
        <CustomPortableText value={overview} isPreamble />
      </header>

      <CustomPortableText value={bodyText} className="pt-2 lg:pt-8" />

      <footer>
        <PublishedTime publishedAt={_createdAt} updatedAt={_updatedAt} />
        <BackButton buttonText="Tilbake" className="my-8" />
      </footer>
    </article>
  );
}
