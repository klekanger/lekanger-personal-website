import type { HOMEPAGE_QUERY_RESULT } from "@repo/shared";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { BlueSkyIcon } from "./icons/BlueSkyIcon";
import { EmailIcon } from "./icons/EmailIcon";
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
  if (!aboutText[0]) return null;

  const { body, title, topImage } = aboutText[0];

  return (
    <section className="my-10 md:my-16">
      <p className="uppercase font-heading">Print whoami$</p>
      <h2
        className="uppercase text-white text-base md:text-2xl pt-4 pb-8"
        id="ommeg"
      >
        {title}
      </h2>
      <div className="grid ">
        <div className="grid md:grid-cols-2 gap-8 md:gap-x-16">
          <SanityImage
            image={topImage?.image}
            alt={topImage?.alt}
            lqip={topImage?.lqip}
            variant="half"
            aspectRatio={1}
            className="c64-blue-overlay"
          />
          <div>
            <CustomPortableText
              value={body}
              isPreamble
              className="font-mono text-base! font-normal!"
            />
            <div className="pt-4">
              <h3 className="py-4">Du finner meg her:</h3>

              <div className="w-fit">
                {contactInfo?.linkedIn && (
                  <a
                    href={contactInfo.linkedIn}
                    className="flex items-center -ml-1 pl-1 pr-2 pointer-coarse:py-2 hover:bg-foreground hover:text-background"
                  >
                    <LinkedInIcon className="size-7 pr-2" />
                    LinkedIn
                  </a>
                )}

                {contactInfo?.gitHub && (
                  <a
                    href={contactInfo.gitHub}
                    className="flex items-center -ml-1 pl-1 pr-2 pointer-coarse:py-2 hover:bg-foreground hover:text-background"
                  >
                    <GitHubIcon className="size-7 pr-2" />
                    GitHub
                  </a>
                )}
                {contactInfo?.blueSky && (
                  <a
                    href={contactInfo.blueSky}
                    className="flex items-center -ml-1 pl-1 pr-2 pointer-coarse:py-2 hover:bg-foreground hover:text-background"
                  >
                    <BlueSkyIcon className="size-7 pr-2" />
                    Bluesky
                  </a>
                )}

                {contactInfo?.twitter && (
                  <a
                    href={contactInfo.twitter}
                    className="flex items-center -ml-1 pl-1 pr-2 pointer-coarse:py-2 hover:bg-foreground hover:text-background"
                  >
                    <XIcon className="size-7 pr-2" />X (Twitter)
                  </a>
                )}

                {contactInfo?.email && (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center -ml-1 pl-1 pr-2 pointer-coarse:py-2 hover:bg-foreground hover:text-background"
                  >
                    <EmailIcon className="size-7 pr-2" />
                    E-post
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
