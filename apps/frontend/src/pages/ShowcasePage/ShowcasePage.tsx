import ProjectSummary from "#/components/ProjectSummary";
import { SanityImage } from "#/components/SanityImage";
import { BackButton } from "#/components/ui/BackButton";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";
import { longDate, shortDate } from "#/utils/dateFormatters";
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
    <article className="prose py-16">
      <h1 style={{ viewTransitionName: `post-${slug}` }}>{title}</h1>
      <SanityImage
        image={topImage?.image}
        alt={topImage?.alt}
        caption={topImage?.caption}
      />
      <CustomPortableText value={overview} isPreamble />
      <br />
      <CustomPortableText value={bodyText} />
      <ProjectSummary
        github={github}
        projectUrl={projectUrl}
        projectText="Lenke til prosjektet"
      />

      <div className="py-4 text-yellow font-heading text-xs">
        PUBLISERT: {longDate(_createdAt).toUpperCase()} (OPPDATERT:{" "}
        {shortDate(_updatedAt)} )
      </div>
      <BackButton buttonText="Tilbake" className="my-8" />
      <BlinkingCursor />
    </article>
  );
}
