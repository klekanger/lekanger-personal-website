import { notFound } from "@tanstack/react-router";
import { BlogPromo } from "#/components/BlogPromo";
import { Hero } from "#/components/Hero";
import { ShowcasePromo } from "#/components/ShowcasePromo";
import { Route } from "@/routes/index";

export function Home() {
  const { data } = Route.useLoaderData();
  if (!data) return notFound();

  const { showcases, blogPosts, heroText, settings } = data;

  return (
    <main className="w-full">
      <Hero heroText={heroText} />
      <ShowcasePromo showcases={showcases} />
      <BlogPromo blogPosts={blogPosts} />
    </main>
  );
}
