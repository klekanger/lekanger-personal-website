import type { HOMEPAGE_QUERY_RESULT } from "@repo/shared";
import { notFound } from "@tanstack/react-router";
import { Badge } from "#/components/ui/Badge";
import { CustomPortableText } from "./PortableText/CustomPortableText";
import { SanityImage } from "./SanityImage";

interface AboutProps {
  aboutText: HOMEPAGE_QUERY_RESULT["aboutText"];
}

export function About({ aboutText }: AboutProps) {
  if (!aboutText) throw notFound();

  const { body, facts, title, topImage } = aboutText[0];

  return (
    <section className="my-16">
      <p className="uppercase font-heading">Print whoami$</p>
      <h2
        className="uppercase font-heading text-white text-2xl pt-4 pb-8"
        id="ommeg"
      >
        {title}
      </h2>
      <div className="grid md:grid-cols-2 gap-8 md:gap-16">
        <SanityImage
          image={topImage?.image}
          alt={topImage?.alt}
          caption={topImage?.caption}
          lqip={topImage?.lqip}
          variant="half"
          aspectRatio={1}
        />
        <div>
          <CustomPortableText
            value={body}
            isPreamble
            className="font-mono text-base! font-normal!"
          />
          <div className="pt-8">
            <Badge subtitle="Rolle" text="Senior fullstack" />
          </div>
        </div>
      </div>
    </section>
  );
}
