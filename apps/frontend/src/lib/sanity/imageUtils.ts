import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
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
