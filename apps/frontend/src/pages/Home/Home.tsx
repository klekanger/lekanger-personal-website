import { notFound } from "@tanstack/react-router";
import { About } from "#/components/About";
import { BlogPromo } from "#/components/BlogPromo";
import { Hero } from "#/components/Hero";
import { ShowcasePromo } from "#/components/ShowcasePromo";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";
import { Route } from "@/routes/index";

export function Home() {
  const { data } = Route.useLoaderData();
  if (!data) return null;

  const { showcases, blogPosts, heroText, aboutText, settings } = data;

  const contactInfo = {
    linkedIn: settings[0].linkedInAccount ?? undefined,
    gitHub: settings[0]?.gitHubAccount ?? undefined,
    blueSky: settings[0]?.otherSocialAccount ?? undefined,
    twitter: settings[0]?.twitterAccount ?? undefined,
    email: settings[0]?.email ?? undefined,
  };

  return (
    <main className="w-full">
      <Hero heroText={heroText} />
      <ShowcasePromo showcases={showcases} />
      <BlogPromo blogPosts={blogPosts} />
      <About aboutText={aboutText} contactInfo={contactInfo} />
      <div className="py-8 font-heading uppercase">
        <p>sys 49152</p>
        READY. <BlinkingCursor />
      </div>
    </main>
  );
}
