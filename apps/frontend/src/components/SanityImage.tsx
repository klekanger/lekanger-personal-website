import type {
  SanityImageAssetReference,
  SanityImageCrop,
  SanityImageHotspot,
} from "@repo/shared";
import { dimensionsFromRef, urlForImage } from "@/lib/sanity/imageUtils";

const WIDTHS = [400, 600, 800, 1024, 1400, 2000]; // All widths we will generate srcset images for
const FALLBACK_WIDTH = 800;
const SIZES = {
  full: "(min-width: 1152px) 979px, calc(90vw - 57.6px)",
  half: "(min-width: 1152px) 512px, (min-width: 768px) calc(50vw - 64px), calc(100vw - 64px)",
} as const;

const cropAxis = (size: number | undefined, start = 0, end = 0) =>
  size ? size * (1 - start - end) : undefined;

export interface SanityImageValue {
  asset?: Pick<SanityImageAssetReference, "_ref"> | null;
  hotspot?: SanityImageHotspot | null;
  crop?: SanityImageCrop | null;
}

export interface SanityImageProps {
  image: SanityImageValue | null | undefined;
  alt?: string | null;
  caption?: string | null;
  lqip?: string | null;
  variant?: keyof typeof SIZES;
  aspectRatio?: number;
  className?: string;
  loading?: "lazy" | "eager";
}

export function SanityImage({
  image,
  alt,
  caption,
  lqip,
  variant = "full",
  aspectRatio,
  className,
  loading = "lazy",
}: SanityImageProps) {
  const ref = image?.asset?._ref;
  if (!ref) return null;

  const { assetWidth, assetHeight } = dimensionsFromRef(ref);
  const crop = image?.crop;

  const cropWidth = cropAxis(assetWidth, crop?.left, crop?.right);
  const cropHeight = cropAxis(assetHeight, crop?.top, crop?.bottom);

  const ratio =
    aspectRatio ??
    (cropWidth && cropHeight ? cropWidth / cropHeight : undefined);

  const maxWidth =
    cropWidth && cropHeight && ratio
      ? Math.floor(Math.min(cropWidth, cropHeight * ratio))
      : undefined;

  const candidates = maxWidth
    ? [...WIDTHS.filter((w) => w < maxWidth), maxWidth]
    : WIDTHS;

  const srcWidth = Math.min(
    FALLBACK_WIDTH,
    maxWidth ?? Number.POSITIVE_INFINITY,
  );

  const heightFor = (width: number) =>
    ratio ? Math.round(width / ratio) : undefined;

  const toUrl = (width: number) => {
    const builder = urlForImage({ ...image, asset: { _ref: ref } })
      .auto("format")
      .width(width);

    const height = heightFor(width);

    return height ? builder.height(height).url() : builder.url();
  };

  const srcHeight = heightFor(srcWidth);

  return (
    <figure className={className}>
      <img
        src={toUrl(srcWidth)}
        srcSet={candidates.map((w) => `${toUrl(w)} ${w}w`).join(", ")}
        sizes={SIZES[variant]}
        alt={alt ?? ""}
        width={srcHeight ? srcWidth : undefined}
        height={srcHeight}
        loading={loading}
        decoding="async"
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
