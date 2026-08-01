import type { StrictComponents } from "../componentTypes";
import { ArticleImageSerializer } from "./ArticleImageSerializer/ArticleImageSerializer";
import { CodeSerializer } from "./CodeSerializer/CodeSerializer";
import { TwitterSerializer } from "./TwitterSerializer/TwitterSerializer";
import { YouTubeSerializer } from "./YouTubeSerializer/YouTubeSerializer";

export const types = {
	image: ArticleImageSerializer,
	YouTube: YouTubeSerializer,
	Twitter: TwitterSerializer,
	code: CodeSerializer,
} satisfies StrictComponents["types"];
