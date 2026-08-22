import type { HOMEPAGE_QUERY_RESULT } from "@repo/shared";
import { notFound } from "@tanstack/react-router";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomPortableText } from "./PortableText/CustomPortableText";

interface HeroProps {
  heroText: HOMEPAGE_QUERY_RESULT["heroText"];
}

export function Hero({ heroText }: HeroProps) {
  if (!heroText) return notFound();

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
            {tags
              ? tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={"outline"}
                    className="py-4 text-white text-lg"
                  >
                    {tag}
                  </Badge>
                ))
              : null}
          </div>

          <div className="flex gap-2 pb-4">
            <Button>RUN "PROSJEKTER"</Button>
            <Button>KONTAKT</Button>
          </div>
        </div>

        <div className="font-heading text-sm mt-0 prose flex-1 pt-8 lg:pt-0">
          <p>READY.</p>
          <p className="text-white">LOAD "WHOAMI",8,1</p>
          <p>SEARCHING FOR WHOAMI</p>
          <p>LOADING... OK</p>
          <p>KURT LEKANGER — SENIOR FULLSTACK-UTVIKLER </p>
          <p>READY.</p>
          <p className="text-white">PRINT STACK$</p>
          <p>REACT NEXT.JS ASTRO VUE SANITY TYPESCRIPT</p>
          <p>READY.</p>
          <p className="text-white">PRINT BAKGRUNN$</p>
          <p>TIDLIGERE TEKNOLOGIJOURNALIST OG REDAKTØR</p>
          <p className="mb-0">READY.</p>
          <BlinkingCursor />
        </div>
      </div>
    </section>
  );
}
