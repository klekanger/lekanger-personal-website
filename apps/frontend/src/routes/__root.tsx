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
import { Analytics } from "@vercel/analytics/react";
import { loadSanityQuery } from "#/lib/sanity/loader";
import { SETTINGS_QUERY } from "@/lib/sanity/queries/settingsQuery";
import {
  absoluteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  TWITTER_HANDLE,
} from "@/lib/siteConfig";
import ogDefaultImage from "/images/og-default.jpg";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import appCss from "../styles.css?url";

interface MyRouterContext {
  queryClient: QueryClient;
}

const OG_IMAGE = absoluteUrl(ogDefaultImage);
const OG_IMAGE_ALT = "Portrett av Kurt Lekanger";

export const Route = createRootRouteWithContext<MyRouterContext>()({
  loader: async ({ context }) => {
    const data = await loadSanityQuery(context, SETTINGS_QUERY);
    return data;
  },
  errorComponent: () => {
    return (
      <div>
        <div>Noe gikk galt</div>
      </div>
    );
  },
  head: ({ matches }) => {
    const url = absoluteUrl(matches.at(-1)?.pathname ?? "/");
    const routeNotFound = matches.some((m) => m.status === "notFound");

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "apple-mobile-web-app-title", content: "lekanger.no" },
        ...(routeNotFound
          ? [
              { title: "Siden ble ikke funnet - Kurt Lekanger" },
              { name: "description", content: "Ingenting å se her - 404" },
              { name: "robots", content: "noindex" },
            ]
          : [
              { title: SITE_NAME },
              { name: "description", content: SITE_DESCRIPTION },
              { property: "og:title", content: SITE_NAME },
              { property: "og:description", content: SITE_DESCRIPTION },
              { property: "og:url", content: url },
              { property: "og:site_name", content: SITE_NAME },
              { property: "og:locale", content: "nb_NO" },
              { property: "og:type", content: "website" },
              { property: "og:image", content: OG_IMAGE },
              { property: "og:image:width", content: "1200" },
              { property: "og:image:height", content: "630" },
              { property: "og:image:type", content: "image/jpeg" },
              { property: "og:image:alt", content: OG_IMAGE_ALT },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:site", content: TWITTER_HANDLE },
              { name: "twitter:creator", content: TWITTER_HANDLE },
              { name: "twitter:title", content: SITE_NAME },
              { name: "twitter:description", content: SITE_DESCRIPTION },
              { name: "twitter:image", content: OG_IMAGE },
              { name: "twitter:image:alt", content: OG_IMAGE_ALT },
            ]),
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
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-96x96.png",
          sizes: "96x96",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    };
  },
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
      <body className="bg-border py-4 sm:py-8">
        <Analytics />
        <div className="sticky top-0 z-50 m-auto max-w-6xl">
          <Header />
        </div>
        <div className="wrap-anywhere m-auto flex min-h-dvh max-w-6xl flex-col bg-background px-4 selection:bg-foreground selection:text-background sm:px-8">
          <main className="grow">{children}</main>
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
