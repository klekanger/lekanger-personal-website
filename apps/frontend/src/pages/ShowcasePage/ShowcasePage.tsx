import { Link } from "@tanstack/react-router";
import ProjectSummary from "#/components/ProjectSummary";
import { SanityImage } from "#/components/SanityImage";
import { BackButton } from "#/components/ui/BackButton";
import PublishedTime from "#/components/ui/PublishedTime";
import { CustomPortableText } from "@/components/PortableText/CustomPortableText";
import { Route } from "@/routes/showcase/$slug";

export function ShowcasePage() {
  const { data } = Route.useLoaderData();

  if (!data) return null;

  const {
    title,
    bodyText,
    overview,
    topImage,
    publishedAt,
    _updatedAt,
    slug,
    github,
    projectUrl,
  } = data;

  return (
    <article className="prose default-padding">
      <header>
        <Link
          to="/showcase"
          search={{ page: 1 }}
          className="px-1 py-1 font-heading text-white uppercase no-underline hover:bg-foreground hover:text-background"
        >
          &lt; Prosjekter
        </Link>
        <h1
          style={{ viewTransitionName: `post-${slug}` }}
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
        <ProjectSummary
          github={github}
          projectUrl={projectUrl}
          projectText="Lenke til prosjektet"
        />

        <PublishedTime publishedAt={publishedAt} updatedAt={_updatedAt} />
        <BackButton buttonText="Tilbake" className="my-8" />
      </footer>
    </article>
  );
}
