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
    <section className="border border-foreground/50 p-4 my-16">
      <div className="pb-4 text-center font-heading text-sm leading-8">
        <div>**** LEKANGER 64 BASIC V2 ****</div>
        <div>
          64K RAM SYSTEM<span className="mx-2"> </span> 38911 BASIC BYTES FREE
        </div>
      </div>
      <hr />
      <div className="flex flex-col lg:flex-row gap-16 md:gap-4 pt-8">
        <div className="prose flex-1">
          <h1 className="text-white uppercase">{heroTitle}</h1>
          <CustomPortableText
            value={preamble}
            isPreamble
            className="font-normal! text-base!"
          />

          <div className="flex gap-2 py-8 font-heading flex-wrap">
            {tags ? tags.map((tag) => <Badge key={tag} text={tag} />) : null}
          </div>

          <div className="flex gap-2 pb-4">
            <Button asChild className="no-underline">
              <Link
                to="/showcase"
                search={{
                  page: 1,
                }}
              >
                {" "}
                RUN "PROSJEKTER"
              </Link>
            </Button>
            <Button asChild className="no-underline">
              <Link to="/page/$slug" params={{ slug: "om-meg" }}>
                OM MEG
              </Link>
            </Button>
          </div>
        </div>
        <div className="font-heading text-sm mt-0 prose flex-1 pt-8 lg:pt-0 ">
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
