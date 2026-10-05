import { SanityImage } from "#/components/SanityImage";
import { BackButton } from "#/components/ui/BackButton";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";
import { longDate, shortDate } from "#/utils/dateFormatters";
import { CustomPortableText } from "@/components/PortableText/CustomPortableText";
import { Route } from "@/routes/page/$slug";

export function Page() {
  const { data } = Route.useLoaderData();

  if (!data) return <h1>404</h1>;

  const { title, bodyText, overview, topImage, _createdAt, _updatedAt, slug } =
    data;

  return (
    <article className="prose py-16">
      <h1 style={{ viewTransitionName: `page-${slug}` }}>{title}</h1>
      <SanityImage
        image={topImage?.image}
        alt={topImage?.alt}
        caption={topImage?.caption}
      />
      <CustomPortableText value={overview} isPreamble />
      <br />
      <CustomPortableText value={bodyText} />
      <div className="pt-8">---</div>
      <div className="py-4 text-yellow font-heading text-xs">
        PUBLISERT: {longDate(_createdAt).toUpperCase()} (OPPDATERT:{" "}
        {shortDate(_updatedAt)} )
      </div>
      <BackButton buttonText="Tilbake" className="my-8" />
      <BlinkingCursor />
    </article>
  );
}
