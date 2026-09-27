import plex400 from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2?url";
import plex700 from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-700-normal.woff2?url";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import kurtPhoto from "/images/OG_Kurt Lekanger portrett wide.webp";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import appCss from "../styles.css?url";

interface MyRouterContext {
  queryClient: QueryClient;
}

const TITLE = "Kurt Lekanger - senior fullstack-utvikler";
const DESCRIPTION =
  "Kurt Lekangers personlige nettside. Skriver om web- og programvareutvikling, retro-programmering på gamle datamaskiner og andre ting som inspirerer meg.";

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: TITLE,
      },
      {
        property: "og:title",
        content: TITLE,
      },
      {
        property: "og:image",
        content: kurtPhoto,
      },
      {
        name: "description",
        content: DESCRIPTION,
      },

      {
        property: "og:description",
        content: DESCRIPTION,
      },
      {
        property: "og:url",
        content: process.env.SITE_URL || "https://www.lekanger.no",
      },
      {
        property: "og:site_name",
        content: "Kurt Lekanger",
      },
      {
        property: "og:locale",
        content: "nb_NO",
      },
      {
        property: "og:type",
        content: "website",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      {
        name: "twitter:url",
        content: "https://x.com/lekanger",
      },
      { name: "twitter:image", content: kurtPhoto },
    ],
    links: [
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: plex400,
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: plex700,
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-border py-8">
        <div className="bg-background wrap-anywhere selection:bg-foreground selection:text-background max-w-6xl m-auto min-h-dvh flex flex-col px-8">
          <Header />
          <div className="grow">{children}</div>
          <Footer />
        </div>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <div className="crt-overlay" aria-hidden="true" />
        <Scripts />
      </body>
    </html>
  );
}
