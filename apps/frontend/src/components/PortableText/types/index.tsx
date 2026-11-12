import type { PortableTextTypeComponentProps } from "@portabletext/react";
import type { Code } from "@repo/shared";
import { lazy, Suspense } from "react";
import type {
  PortableTextValueOfType,
  StrictComponents,
} from "../componentTypes";
import { ArticleImageSerializer } from "./ArticleImageSerializer/ArticleImageSerializer";
import { HtmlEmbedSerializer } from "./HtmlEmbedSerializer/HtmlEmbedSerializer";

const LazyCodeSerializer = lazy(() =>
  import("./CodeSerializer/CodeSerializer").then((m) => ({
    default: m.CodeSerializer,
  })),
);

const LazyTwitterSerializer = lazy(() =>
  import("./TwitterSerializer/TwitterSerializer").then((m) => ({
    default: m.TwitterSerializer,
  })),
);

const LazyYouTubeSerializer = lazy(() =>
  import("./YouTubeSerializer/YouTubeSerializer").then((m) => ({
    default: m.YouTubeSerializer,
  })),
);

const TwitterSerializer = (
  props: PortableTextTypeComponentProps<PortableTextValueOfType<"Twitter">>,
) => {
  return (
    <Suspense
      fallback={
        <div className="my-6 min-h-62.5 max-w-137.5 rounded-xl border border-foreground/20" />
      }
    >
      <LazyTwitterSerializer {...props} />
    </Suspense>
  );
};

const CodeSerializer = (props: PortableTextTypeComponentProps<Code>) => {
  return (
    <Suspense
      fallback={
        <figure>
          {props.value.filename ? (
            <figcaption>{props.value.filename}</figcaption>
          ) : null}
          <pre style={{ backgroundColor: "#24292e", color: "#e1e4e8" }}>
            <code>{props.value.code}</code>
          </pre>
        </figure>
      }
    >
      <LazyCodeSerializer {...props} />
    </Suspense>
  );
};

const YouTubeSerializer = (
  props: PortableTextTypeComponentProps<PortableTextValueOfType<"YouTube">>,
) => {
  return (
    <Suspense fallback={<div className="mt-8 mb-8 aspect-video" />}>
      <LazyYouTubeSerializer {...props} />
    </Suspense>
  );
};

export const types = {
  image: ArticleImageSerializer,
  figure: ArticleImageSerializer,
  articleImage: ArticleImageSerializer,
  YouTube: YouTubeSerializer,
  Twitter: TwitterSerializer,
  code: CodeSerializer,
  htmlEmbed: HtmlEmbedSerializer,
} satisfies StrictComponents["types"];
