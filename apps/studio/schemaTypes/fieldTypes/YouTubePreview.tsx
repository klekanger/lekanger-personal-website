// Description of how to render this in the frontend:
// https://www.sanity.io/guides/portable-text-how-to-add-a-custom-youtube-embed-block

import { Box, Text } from "@sanity/ui";
import type { PreviewProps } from "sanity";

const VIDEO_ID =
  /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/;

function embedUrl(url: string) {
  const id = url.match(VIDEO_ID)?.[1];
  return id ? `https://www.youtube.com/embed/${id}?rel=0` : null;
}

export function YouTubePreview(props: PreviewProps) {
  const { title: url } = props;
  const src = typeof url === "string" ? embedUrl(url) : null;

  if (!src) {
    return (
      <Box padding={3}>
        <Text>Legg inn en gyldig YouTube-URL</Text>
      </Box>
    );
  }

  // Deliberately a raw iframe rather than react-player: the Studio's index.html
  // sets `<meta name="referrer" content="same-origin">`, so the embed sends no
  // Referer and YouTube refuses to play it ("Feil 153"). An iframe-level
  // referrerPolicy overrides the document default, but react-player builds its
  // iframe inside a shadow root before its `config` prop is assigned, so the
  // attribute never lands there. The frontend needs no such override.
  return (
    <Box padding={3}>
      <iframe
        referrerPolicy="strict-origin-when-cross-origin"
        src={src}
        title="YouTube-video"
        allow="accelerometer; fullscreen; autoplay; encrypted-media; gyroscope; picture-in-picture"
        style={{ width: "100%", aspectRatio: "16 / 9", border: 0 }}
      />
    </Box>
  );
}
