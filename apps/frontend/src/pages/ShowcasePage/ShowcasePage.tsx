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
    _createdAt,
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
          className="pt-8 text-white"
        >
          {title}
        </h1>
        <SanityImage
          image={topImage?.image}
          alt={topImage?.alt}
          lqip={topImage?.lqip}
          caption={topImage?.caption}
        />
        <CustomPortableText value={overview} isPreamble />
      </header>

      <CustomPortableText value={bodyText} />

      <footer>
        <ProjectSummary
          github={github}
          projectUrl={projectUrl}
          projectText="Lenke til prosjektet"
        />

        <PublishedTime _createdAt={_createdAt} _updatedAt={_updatedAt} />
        <BackButton buttonText="Tilbake" className="my-8" />
      </footer>
    </article>
  );
}
