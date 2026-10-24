import type { PortableTextTypeComponentProps } from "@portabletext/react";
import ReactPlayer from "react-player";
import type { PortableTextValueOfType } from "../../componentTypes";

export const YouTubeSerializer = ({
  value,
}: PortableTextTypeComponentProps<PortableTextValueOfType<"YouTube">>) => {
  if (!value?.url) {
    return null;
  }

  const url = value.url || "";

  return (
    <div className="mt-8 mb-8 aspect-video">
      <ReactPlayer src={url} width="100%" height="100%" controls={true} />
    </div>
  );
};
