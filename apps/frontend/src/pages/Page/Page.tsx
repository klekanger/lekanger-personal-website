import { SanityImage } from "#/components/SanityImage";
import { BackButton } from "#/components/ui/BackButton";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";
import { longDate, shortDate } from "#/utils/dateFormatters";
import { CustomPortableText } from "@/components/PortableText/CustomPortableText";
import { Route } from "@/routes/page/$slug";

export function Page() {
  const { data } = Route.useLoaderData();

  if (!data) return null;

  const { title, bodyText, overview, topImage, _createdAt, _updatedAt, slug } =
    data;

  return (
    <article className="prose py-10 md:py-16">
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
        <div className="py-4 font-heading text-xs text-yellow uppercase">
          PUBLISERT: {longDate(_createdAt)} (OPPDATERT: {shortDate(_updatedAt)}{" "}
          )
        </div>
        <BackButton buttonText="Tilbake" className="my-8" />
      </footer>
      <BlinkingCursor />
    </article>
  );
}
