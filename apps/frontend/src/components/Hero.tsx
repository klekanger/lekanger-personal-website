import type { HOMEPAGE_QUERY_RESULT } from "@repo/shared";
import { Link, notFound } from "@tanstack/react-router";
import { Badge } from "#/components/ui/Badge";
import { Facts } from "@/components/Facts";
import { Button } from "@/components/ui/button";
import { CustomPortableText } from "./PortableText/CustomPortableText";

interface HeroProps {
  heroText: HOMEPAGE_QUERY_RESULT["heroText"];
}

export function Hero({ heroText }: HeroProps) {
  if (!heroText?.length) return null;
  const { heroTitle, preamble, facts, tags } = heroText[0];

  return (
    <section className="border border-foreground/50 p-4 my-10 md:my-16">
      <div className="pb-4 text-center font-heading text-xs md:text-sm leading-8">
        <div>**** LEKANGER 64 BASIC V2 ****</div>
        <div>
          64K RAM SYSTEM<span className="mx-2"> </span> 38911 BASIC BYTES FREE
        </div>
      </div>
      <hr />
      <div className="flex flex-col lg:flex-row pt-8">
        <div className="flex-1 flex flex-col justify-between gap-8">
          <div className="prose">
            <h1 className="text-white uppercase text-base md:text-2xl lg:text-4xl">
              {heroTitle}
            </h1>
            <CustomPortableText
              value={preamble}
              isPreamble
              className="font-normal! text-base!"
            />
          </div>

          <div className="flex flex-col gap-2 mb-12 lg:mb-8  prose uppercase">
            <Button
              asChild
              className="no-underline text-sm md:text-base lg:text-lg font-semibold font-mono"
            >
              <Link
                to="/showcase"
                search={{
                  page: 1,
                }}
              >
                {" "}
                Store og små prosjekter
              </Link>
            </Button>
            <Button
              asChild
              className="no-underline text-sm md:text-base lg:text-lg font-semibold font-mono"
            >
              <Link to="/blog-page" search={{ page: 1 }}>
                Blogg om litt av hvert
              </Link>
            </Button>
            <Button
              asChild
              className="no-underline text-sm md:text-base lg:text-lg font-semibold font-mono"
            >
              <Link to="/page/$slug" params={{ slug: "om-meg" }}>
                Om meg
              </Link>
            </Button>
          </div>
        </div>
        <div className="font-heading text-sm mt-0 prose flex-1">
          <Facts
            content={facts}
            pause={1200}
            typeSpeed={45}
            searchTime={1200}
            loadTime={1000}
          />
          <br />
        </div>
      </div>
    </section>
  );
}
