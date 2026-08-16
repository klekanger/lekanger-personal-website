import type { StrictComponents } from "../componentTypes";
import { ArticleImageSerializer } from "./ArticleImageSerializer/ArticleImageSerializer";
import { CodeSerializer } from "./CodeSerializer/CodeSerializer";
import { HtmlEmbedSerializer } from "./HtmlEmbedSerializer/HtmlEmbedSerializer";
import { TwitterSerializer } from "./TwitterSerializer/TwitterSerializer";
import { YouTubeSerializer } from "./YouTubeSerializer/YouTubeSerializer";

export const types = {
  image: ArticleImageSerializer,
  figure: ArticleImageSerializer,
  articleImage: ArticleImageSerializer,
  YouTube: YouTubeSerializer,
  Twitter: TwitterSerializer,
  code: CodeSerializer,
  htmlEmbed: HtmlEmbedSerializer,
} satisfies StrictComponents["types"];
