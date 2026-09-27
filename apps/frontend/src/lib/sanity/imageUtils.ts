import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import type { SanityImageValue } from "#/components/SanityImage";
import { client } from "./client";

export const imageBuilder = createImageUrlBuilder(client);

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};

export function dimensionsFromRef(ref: string | undefined): {
  assetWidth: number | undefined;
  assetHeight: number | undefined;
} {
  const match = ref?.match(/-(\d+)x(\d+)-[a-z]+$/);
  return match
    ? { assetWidth: Number(match[1]), assetHeight: Number(match[2]) }
    : { assetWidth: undefined, assetHeight: undefined };
}

export function ogImageUrl(image: SanityImageValue | null | undefined) {
  if (!image?.asset?._ref) return undefined;

  return urlForImage(image)
    .width(1200)
    .height(630)
    .fit("crop")
    .format("jpg")
    .quality(80)
    .url();
}
