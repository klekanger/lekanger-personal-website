import type { PortableTextTypeComponentProps } from "@portabletext/react";
import { SanityImage } from "@/components/SanityImage";
import type { PortableTextValueOfType } from "../../componentTypes";

export const ArticleImageSerializer = ({
  value,
}: PortableTextTypeComponentProps<
  PortableTextValueOfType<"image" | "figure" | "articleImage">
>) => {
  const source = value._type === "articleImage" ? value.image : value;

  return (
    <SanityImage
      image={source}
      alt={value.alt}
      caption={value.caption}
      lqip={"lqip" in value ? value.lqip : undefined}
      variant="full"
    />
  );
};
