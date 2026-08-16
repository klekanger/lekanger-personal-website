import type {
  ClientPerspective,
  QueryParams,
  SanityQueries,
} from "@sanity/client";
import { queryOptions } from "@tanstack/react-query";
import { client } from "@/lib/sanity/client";

export function sanityQueryOptions<const TQuery extends keyof SanityQueries>({
  query,
  params = {},
  perspective = "published",
}: {
  query: TQuery;
  params?: QueryParams;
  perspective?: ClientPerspective;
}) {
  return queryOptions({
    queryKey: ["sanity", query, params, perspective],
    // Published content is public — no token needed. A token is only required
    // for drafts/preview, and it must never be sent from the client anyway.
    queryFn: () => client.withConfig({ perspective }).fetch(query, params),
  });
}
