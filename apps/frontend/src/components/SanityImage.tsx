import type {
  SanityImageAssetReference,
  SanityImageCrop,
  SanityImageHotspot,
} from "@repo/shared";
import {
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { dimensionsFromRef, urlForImage } from "@/lib/sanity/imageUtils";

const WIDTHS = [400, 600, 800, 1024, 1400, 2000]; // All widths we will generate srcset images for
const MAX_WIDTH = WIDTHS.at(-1) || 0;
const FALLBACK_WIDTH = 800;

const SIZES = {
  full: "(min-width: 1152px) 979px, calc(90vw - 57.6px)",
  half: "(min-width: 1152px) 512px, (min-width: 768px) calc(50vw - 64px), calc(100vw - 64px)",
} as const;

const cropAxis = (size: number | undefined, start = 0, end = 0) =>
  size ? size * (1 - start - end) : undefined;

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

const rectFromUrl = (url: string): Rect | undefined => {
  const rect = new URL(url).searchParams.get("rect");
  if (!rect) return undefined;

  const [left, top, width, height] = rect.split(",").map(Number);
  return { left, top, width, height };
};

const backgroundOffset = (offset: number, size: number, total: number) =>
  size < total ? (offset / (total - size)) * 100 : 0;

const placeholderStyle = (
  lqip: string,
  rect: Rect | undefined,
  assetWidth: number | undefined,
  assetHeight: number | undefined,
): CSSProperties => {
  const base = {
    backgroundImage: `url(${lqip})`,
    backgroundRepeat: "no-repeat",
  };

  if (!rect || !assetWidth || !assetHeight) {
    return { ...base, backgroundSize: "cover", backgroundPosition: "center" };
  }

  return {
    ...base,
    backgroundSize: `${(assetWidth / rect.width) * 100}% ${(assetHeight / rect.height) * 100}%`,
    backgroundPosition: `${backgroundOffset(rect.left, rect.width, assetWidth)}% ${backgroundOffset(rect.top, rect.height, assetHeight)}%`,
  };
};

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
  clickToEnlarge?: boolean;
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
  clickToEnlarge = false,
}: SanityImageProps) {
  const [showEnlargedImage, setShowEnlargedImage] = useState(false);

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
      ? Math.floor(Math.min(cropWidth, cropHeight * ratio, MAX_WIDTH))
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
  const src = toUrl(srcWidth);
  const srcSet = candidates.map((w) => `${toUrl(w)} ${w}w`).join(", ");

  const thumbnail = (
    <img
      src={src}
      srcSet={srcSet}
      sizes={SIZES[variant]}
      alt={alt ?? ""}
      width={srcHeight ? srcWidth : undefined}
      height={srcHeight}
      loading={loading}
      decoding="async"
      className="relative"
      style={
        lqip
          ? placeholderStyle(lqip, rectFromUrl(src), assetWidth, assetHeight)
          : undefined
      }
    />
  );

  return (
    <>
      <figure className={className}>
        {clickToEnlarge ? (
          <button
            type="button"
            className="group relative block cursor-zoom-in"
            aria-label={alt ? `Vis større bilde: ${alt}` : "Vis større bilde"}
            onClick={() => setShowEnlargedImage(true)}
          >
            {thumbnail}
            <span
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100"
              aria-hidden="true"
            ></span>
          </button>
        ) : (
          <div className="relative">{thumbnail}</div>
        )}
        {caption && (
          <figcaption className="pt-2 font-mono text-yellow">
            {caption}
          </figcaption>
        )}
      </figure>

      {showEnlargedImage &&
        createPortal(
          <Lightbox
            src={src}
            srcSet={srcSet}
            alt={alt ?? ""}
            width={srcHeight ? srcWidth : undefined}
            height={srcHeight}
            onClose={() => setShowEnlargedImage(false)}
          />,
          document.body,
        )}
    </>
  );
}

interface LightboxProps {
  src: string;
  srcSet: string;
  alt: string;
  width?: number;
  height?: number;
  onClose: () => void;
}

function Lightbox({ src, srcSet, alt, width, height, onClose }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
    } else if (event.key === "Tab") {
      event.preventDefault();
      closeButtonRef.current?.focus();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Forstørret bilde"}
      className="fixed inset-0 z-100 flex cursor-zoom-out items-center justify-center bg-black/70 p-4 backdrop-blur-xl"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Lukk"
        className="absolute top-4 right-4 size-10 text-3xl text-white"
        onClick={onClose}
      >
        <span aria-hidden="true">×</span>
      </button>
      <img
        src={src}
        srcSet={srcSet}
        sizes="90vw"
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        className="h-auto max-h-[90dvh] w-auto max-w-[2000px] object-contain"
      />
    </div>
  );
}
