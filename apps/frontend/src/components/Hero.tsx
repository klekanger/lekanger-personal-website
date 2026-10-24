import type { HOMEPAGE_QUERY_RESULT } from "@repo/shared";
import { Link } from "@tanstack/react-router";
import { Facts } from "@/components/Facts";
import { Button } from "@/components/ui/button";
import { CustomPortableText } from "./PortableText/CustomPortableText";

interface HeroProps {
  heroText: HOMEPAGE_QUERY_RESULT["heroText"];
}

export function Hero({ heroText }: HeroProps) {
  if (!heroText?.length) return null;
  const { heroTitle, preamble, facts } = heroText[0];

  return (
    <section className="my-10 border border-foreground/50 p-4 md:my-16">
      <div className="pb-4 text-center font-heading text-xs leading-8 md:text-sm">
        <div>**** LEKANGER 64 BASIC V2 ****</div>
        <div>
          64K RAM SYSTEM<span className="mx-2"> </span> 38911 BASIC BYTES FREE
        </div>
      </div>
      <hr />
      <div className="flex flex-col pt-8 lg:flex-row">
        <div className="flex flex-1 flex-col justify-between gap-8">
          <div className="prose">
            <h1 className="text-base text-white uppercase md:text-2xl lg:text-4xl">
              {heroTitle}
            </h1>
            <CustomPortableText
              value={preamble}
              isPreamble
              className="font-normal! text-base!"
            />
          </div>

          <div className="prose mb-12 flex flex-col gap-2 uppercase lg:mb-8">
            <Button
              asChild
              className="font-mono font-semibold text-sm no-underline md:text-base lg:text-lg"
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
              className="font-mono font-semibold text-sm no-underline md:text-base lg:text-lg"
            >
              <Link to="/blog-page" search={{ page: 1 }}>
                Blogg om litt av hvert
              </Link>
            </Button>
            <Button
              asChild
              className="font-mono font-semibold text-sm no-underline md:text-base lg:text-lg"
            >
              <Link to="/page/$slug" params={{ slug: "om-meg" }}>
                Om meg
              </Link>
            </Button>
          </div>
        </div>
        <div className="prose mt-0 flex-1 font-heading text-sm">
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
