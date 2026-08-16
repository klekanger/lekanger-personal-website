import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { client } from "./client";

export const imageBuilder = createImageUrlBuilder(client);

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};
