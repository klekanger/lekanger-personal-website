import type { HOMEPAGE_QUERY_RESULT } from "@repo/shared";
import { urlForImage } from "@/lib/sanity/imageUtils";

type ArticleImageValue = NonNullable<
  HOMEPAGE_QUERY_RESULT["aboutText"]
>[number]["topImage"];

const WIDTHS = [400, 800, 1200, 1600, 2000] as const;
const FALLBACK_WIDTH = 800;
const SIZES = {
  full: "(min-width: 1152px) 979px, 85vw",
  half: "(min-width: 1152px) 512px, (min-width: 768px) 45vw, 90vw",
};
const ASPECT_RATIOS = {
  horizontal: 16 / 9,
  square: 1,
} as const;

interface SanityImageProps {
  imageSrc: ArticleImageValue;
  caption?: string | undefined | null;
  variant?: keyof typeof SIZES;
  format?: keyof typeof ASPECT_RATIOS | "natural";
}

export function SanityImage({
  imageSrc,
  caption,
  variant = "full",
  format = "natural",
}: SanityImageProps) {
  if (!imageSrc) return null;

  const { alt, image, metadata } = imageSrc;
  if (!image) return null;

  const dimensions = metadata?.dimensions;
  const aspectRatio =
    format === "natural" ? dimensions?.aspectRatio : ASPECT_RATIOS[format];
  const maxWidth = dimensions?.width;
  const candidates = maxWidth
    ? [...WIDTHS.filter((w) => w < maxWidth), maxWidth]
    : [...WIDTHS];

  const builder = urlForImage(image).auto("format");

  const toUrl = (width: number) =>
    aspectRatio
      ? builder
          .width(width)
          .height(Math.round(width / aspectRatio))
          .url()
      : builder.width(width).url();

  const height = aspectRatio
    ? Math.round(FALLBACK_WIDTH / aspectRatio)
    : undefined;
  const width = height ? FALLBACK_WIDTH : undefined;
  const lqip = metadata?.lqip;

  return (
    <figure>
      <img
        src={toUrl(FALLBACK_WIDTH)}
        srcSet={candidates.map((w) => `${toUrl(w)} ${w}w`).join(", ")}
        sizes={SIZES[variant]}
        alt={alt || ""}
        width={width}
        height={height}
        className="w-full"
        style={
          lqip
            ? {
                backgroundImage: `url(${lqip})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      />
      {caption && (
        <figcaption className="pt-2 font-mono text-yellow">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
