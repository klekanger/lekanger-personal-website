import { Link } from "@tanstack/react-router";
import { SanityImage } from "#/components/SanityImage";
import { BackButton } from "#/components/ui/BackButton";
import PublishedTime from "#/components/ui/PublishedTime";
import { CustomPortableText } from "@/components/PortableText/CustomPortableText";
import { Route } from "@/routes/blog-page/$slug";

export function BlogPage() {
  const { data } = Route.useLoaderData();
  if (!data) return null;

  const {
    title,
    overview,
    body,
    bodyText,
    topImage,
    mainImage,
    publishedAt,
    _updatedAt,
    slug,
  } = data;

  // Field type `body` is deprecated, but we are keeping it to be able to render old articles
  // Using `bodyText` on all new articles
  const bodyTextToRender = body ? body : bodyText;

  return (
    <article className="prose default-padding">
      <header>
        <Link
          to="/blog-page"
          search={{ page: 1 }}
          className="px-1 py-1 font-heading text-white uppercase no-underline hover:bg-foreground hover:text-background"
        >
          &lt; Blogg
        </Link>
        <h1
          style={{ viewTransitionName: `post-${slug}` }}
          className="hyphens-auto pt-8 text-2xl text-white md:text-4xl"
        >
          {title}
        </h1>

        <SanityImage
          image={topImage?.image ? topImage.image : mainImage}
          alt={topImage?.alt || mainImage?.alt}
          lqip={topImage?.image ? topImage.lqip : mainImage?.lqip}
          caption={topImage?.caption || ""}
          className="pb-8"
        />

        <CustomPortableText value={overview} isPreamble />
      </header>

      <CustomPortableText value={bodyTextToRender} className="pt-2 lg:pt-8" />

      <footer>
        <PublishedTime publishedAt={publishedAt} updatedAt={_updatedAt} />
        <BackButton buttonText="Tilbake" className="my-8" />
      </footer>
    </article>
  );
}
