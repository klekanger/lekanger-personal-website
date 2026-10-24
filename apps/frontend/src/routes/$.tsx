import { createFileRoute, notFound } from "@tanstack/react-router";

// Catch-all for URLs that match no route. Throwing notFound() in the loader
// gives the match status "notFound", which __root.tsx's head uses for 404 meta.
export const Route = createFileRoute("/$")({
  loader: () => {
    throw notFound();
  },
});
