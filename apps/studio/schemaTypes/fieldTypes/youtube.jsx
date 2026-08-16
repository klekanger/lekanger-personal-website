import { PlayIcon } from "@sanity/icons/Play";
import { defineField, defineType } from "sanity";
import { YouTubePreview } from "./YouTubePreview";

export const youtube = defineType({
  name: "youtube",
  type: "object",
  title: "YouTube",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "URL til YouTube-videoen",
    }),
  ],
  preview: {
    select: { title: "url" },
  },
  components: {
    preview: YouTubePreview,
  },
});
