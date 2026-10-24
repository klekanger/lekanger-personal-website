import ProjectSummary from "#/components/ProjectSummary";
import { SanityImage } from "#/components/SanityImage";
import { BackButton } from "#/components/ui/BackButton";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";
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
    <article className="prose py-10 md:py-16">
      <header>
        <h1 style={{ viewTransitionName: `post-${slug}` }}>{title}</h1>
        <SanityImage
          image={topImage?.image}
          alt={topImage?.alt}
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
      <BlinkingCursor />
    </article>
  );
}
