import type { HOMEPAGE_QUERY_RESULT } from "@repo/shared";
import { linkOptions } from "@tanstack/react-router";
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
    <section className="my-4 md:my-8">
      <p className="font-heading uppercase" aria-hidden="true">
        Print whoami$
      </p>
      <h2
        className="pt-4 pb-8 text-base text-white uppercase md:text-2xl"
        id="ommeg"
      >
        {title}
      </h2>
      <div className="grid">
        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16">
          <div>
            <SanityImage
              image={topImage?.image}
              alt={topImage?.alt}
              lqip={topImage?.lqip}
              variant="half"
              aspectRatio={1}
              className="c64-blue-overlay"
            />
            <div className="pt-4">
              <h3 className="pt-4 pb-8 text-2xl text-white">
                Du finner meg her:
              </h3>

              <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-4 font-heading text-sm lg:text-base">
                {contactInfo?.linkedIn && (
                  <li>
                    <a
                      href={contactInfo.linkedIn}
                      className="-ml-1 flex items-center pointer-coarse:py-2 pr-2 pl-1 hover:bg-foreground hover:text-background"
                    >
                      <LinkedInIcon className="size-7 pr-2" />
                      LinkedIn
                    </a>
                  </li>
                )}

                {contactInfo?.gitHub && (
                  <li>
                    <a
                      href={contactInfo.gitHub}
                      className="-ml-1 flex items-center pointer-coarse:py-2 pr-2 pl-1 hover:bg-foreground hover:text-background"
                    >
                      <GitHubIcon className="size-7 pr-2" />
                      GitHub
                    </a>
                  </li>
                )}
                {contactInfo?.blueSky && (
                  <li>
                    <a
                      href={contactInfo.blueSky}
                      className="-ml-1 flex items-center pointer-coarse:py-2 pr-2 pl-1 hover:bg-foreground hover:text-background"
                    >
                      <BlueSkyIcon className="size-7 pr-2" />
                      Bluesky
                    </a>
                  </li>
                )}

                {contactInfo?.twitter && (
                  <li>
                    <a
                      href={contactInfo.twitter}
                      className="-ml-1 flex items-center pointer-coarse:py-2 pr-2 pl-1 hover:bg-foreground hover:text-background"
                    >
                      <XIcon className="size-7 pr-2" />X (Twitter)
                    </a>
                  </li>
                )}

                {contactInfo?.email && (
                  <li>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="-ml-1 flex items-center pointer-coarse:py-2 pr-2 pl-1 hover:bg-foreground hover:text-background"
                    >
                      <EmailIcon className="size-7 pr-2" />
                      E-post
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div>
            <CustomPortableText
              value={body}
              isPreamble
              className="font-mono font-normal! text-base!"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
