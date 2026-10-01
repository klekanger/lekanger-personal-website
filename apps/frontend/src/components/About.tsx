import type { HOMEPAGE_QUERY_RESULT } from "@repo/shared";
import { notFound } from "@tanstack/react-router";
import { Badge } from "#/components/ui/Badge";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { BlueSkyIcon } from "./icons/BlueSkyIcon";
import { EmailIcon } from "./icons/emailIcon";
import { GitHubIcon } from "./icons/GitHubIcon";
import { XIcon } from "./icons/XIcon";
import { CustomPortableText } from "./PortableText/CustomPortableText";
import { SanityImage } from "./SanityImage";

interface AboutProps {
  aboutText: HOMEPAGE_QUERY_RESULT["aboutText"];
  contactInfo?: {
    linkedIn?: string;
    gitHub?: string;
    blueSky?: string;
    twitter?: string;
    email?: string;
  };
}

export function About({ aboutText, contactInfo }: AboutProps) {
  if (!aboutText) throw notFound();

  console.log("contactInfo ", contactInfo);
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
      <div className="grid ">
        <div className="grid md:grid-cols-2 gap-8 md:gap-x-16">
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
          <div>
            <h3 className="py-4">Du finner meg her:</h3>

            <div className="w-fit">
              <div className="flex items-center -ml-1 pl-1 pr-2 hover:bg-foreground hover:text-background">
                <LinkedInIcon className="size-7 pr-2" />
                <a href={contactInfo?.linkedIn}>LinkedIn</a>
              </div>

              <div className="flex items-center -ml-1 pl-1 pr-2 hover:bg-foreground hover:text-background">
                <GitHubIcon className="size-7 pr-2" />
                <a href={contactInfo?.gitHub}>GitHub</a>
              </div>

              <div className="flex items-center -ml-1 pl-1 pr-2 hover:bg-foreground hover:text-background">
                <BlueSkyIcon className="size-7 pr-2" />
                <a href={contactInfo?.blueSky}>Bluesky</a>
              </div>

              <div className="flex items-center -ml-1 pl-1 pr-2 hover:bg-foreground hover:text-background">
                <XIcon className="size-7 pr-2" />
                <a href={contactInfo?.twitter}>X (Twitter)</a>
              </div>

              <div className="flex items-center -ml-1 pl-1 pr-2 hover:bg-foreground hover:text-background">
                <EmailIcon className="size-7 pr-2" />
                <a href={`mailto:${contactInfo?.email}`}>E-post</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
