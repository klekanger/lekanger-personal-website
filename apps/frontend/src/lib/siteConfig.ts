const isServer = typeof window === "undefined";
const FALLBACK_SITE_URL = "https://www.lekanger.no";

const SITE_URL = isServer
  ? process.env.SITE_URL || process.env.VITE_SITE_URL || FALLBACK_SITE_URL
  : import.meta.env.VITE_SITE_URL || FALLBACK_SITE_URL;

const SITE_NAME = "Kurt Lekanger - senior fullstack-utvikler";
const SITE_DESCRIPTION =
  "Kurt Lekangers personlige nettside. Skriver om web- og programvareutvikling, retro-programmering på gamle datamaskiner og andre ting som inspirerer meg.";
const TWITTER_HANDLE = "@lekanger";

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export { absoluteUrl, SITE_NAME, SITE_URL, TWITTER_HANDLE, SITE_DESCRIPTION };
