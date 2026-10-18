/**
 * Webhook handler for revalidating a specific path on the server
 */

import { timingSafeEqual } from "node:crypto";
import { defineHandler, HTTPError } from "nitro";

interface RevalidatePayload {
  slug?: string;
  type?: string | null;
}

// Sanity document types and their affected paths on the frontend
function affectedPaths({ type, slug }: RevalidatePayload): Array<string> {
  switch (type) {
    case "blog":
      return ["/", "/blog-page", ...(slug ? [`/blog-page/${slug}`] : [])];
    case "showcase":
      return ["/", "/showcase", ...(slug ? [`/showcase/${slug}`] : [])];
    case "project":
      return slug ? [`/project/${slug}`] : [];
    case "heroText":
    case "settings":
      return ["/"];
    default:
      return [];
  }
}

// Check if two secrets matches
function secretMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;

  const providedBytes = Buffer.from(provided);
  const expectedBytes = Buffer.from(expected);

  return (
    providedBytes.length === expectedBytes.length &&
    timingSafeEqual(providedBytes, expectedBytes)
  );
}

/**
 * Webhook handler for revalidating a specific path on the server
 * Called from Sanity
 */
export default defineHandler(async (event) => {
  const secret = process.env.REVALIDATE_SECRET;
  const bypassToken = process.env.VERCEL_BYPASS_TOKEN;

  if (!secret || !bypassToken) {
    throw new HTTPError({
      status: 500,
      message: "Revalidation is not correctly configured on the server.",
    });
  }

  const receivedSecret = event.req.headers.get("x-vercel-secret");

  if (!secretMatches(receivedSecret, secret)) {
    throw new HTTPError({
      status: 401,
      message: "Unauthorized",
    });
  }

  const payload = (await event.req
    .json()
    .catch(() => null)) as RevalidatePayload | null;

  if (!payload?.type) {
    throw new HTTPError({
      status: 400,
      message: "Webhook payload is missing a document type",
    });
  }

  const paths = affectedPaths(payload);
  if (paths.length === 0) {
    return { revalidated: [], ignoredType: payload.type };
  }

  const origin = process.env.SITE_URL ?? event.url.origin;

  const revalidated = await Promise.all(
    paths.map(async (path) => {
      const response = await fetch(new URL(path, origin), {
        method: "HEAD",
        headers: { "x-prerender-revalidate": bypassToken },
      });
      return { path, status: response.status };
    }),
  );

  return { revalidated };
});
