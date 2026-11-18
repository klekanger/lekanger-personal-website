import type { HOMEPAGE_QUERY_RESULT } from "@repo/shared";
import { Link, linkOptions } from "@tanstack/react-router";
import { Facts } from "@/components/Facts";
import { PetsciiTitle } from "./PetsciiTitle";
import { CustomPortableText } from "./PortableText/CustomPortableText";

interface HeroProps {
  heroText: HOMEPAGE_QUERY_RESULT["heroText"];
}

const HERO_LINKS = linkOptions([
  {
    to: "/showcase",
    search: { page: 1 },
    label: "Store og små prosjekter",
  },
  {
    to: "/blog-page",
    search: { page: 1 },
    label: "Blogg om litt av hvert",
  },
  {
    to: "/page/$slug",
    params: { slug: "om-meg" },
    label: "Om meg",
  },
]);

export function Hero({ heroText }: HeroProps) {
  if (!heroText?.length) return null;
  const { heroTitle, preamble, facts } = heroText[0];

  return (
    <section className="mt-8 py-4 lg:mt-8">
      <div
        className="@container pt-0 pb-16 text-center font-heading text-xs leading-loose md:text-sm"
        aria-hidden="true" // decorative banner only
      >
        <div className="text-[min(calc(100cqi/30),1.2rem)]">
          **** LEKANGER 64 BASIC V2 ****
        </div>
        <div className="text-[min(calc(100cqi/30),1.2rem)]">
          64K RAM SYSTEM<span className="mx-2"> </span> 38911 BASIC BYTES FREE
        </div>
      </div>

      <div className="w-full">
        <PetsciiTitle
          from={heroTitle || ""}
          to="Skribent med utviklerkløe"
          delay={3000}
          className="text-2xl text-white uppercase lg:text-4xl"
        />
      </div>
      <div className="flex flex-col pt-8 lg:flex-row lg:pt-12">
        <div className="flex flex-1 flex-col justify-between">
          <div className="prose">
            <CustomPortableText
              value={preamble}
              isPreamble
              className="font-normal! text-base!"
            />
          </div>

          <nav
            aria-label="Snarveier"
            className="mb-12 pt-8 lg:mb-8 lg:max-w-[90%]"
          >
            <ul className="border-foreground/50 border-t">
              {HERO_LINKS.map(({ label, ...linkProps }, idx) => (
                <li key={label} className="border-foreground/50 border-b">
                  <Link
                    {...linkProps}
                    className="group flex gap-4 px-2 py-3 font-semibold hover:bg-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="text-yellow group-hover:text-background"
                    >
                      {idx + 1}
                    </span>
                    <span className="flex grow flex-row justify-between">
                      <span className="text-white group-hover:text-background">
                        {label}
                      </span>
                      <span
                        className="self-center pr-2 font-heading font-normal text-foreground group-hover:text-background motion-safe:group-hover:translate-x-2"
                        aria-hidden="true"
                      >
                        {">"}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="relative mt-0 mb-8 flex-1 rounded-[8px] border-4 border-foreground p-4 font-heading text-sm leading-relaxed">
          <div className="absolute -top-3 left-4 z-10 bg-background px-2">
            FAKTA
          </div>
          <Facts
            content={facts}
            pause={1200}
            typeSpeed={45}
            searchTime={1200}
            loadTime={1000}
          />
        </div>
      </div>
    </section>
  );
}
