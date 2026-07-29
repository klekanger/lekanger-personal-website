import type { QueryParams, SanityQueries } from "@sanity/client";
import type { QueryClient } from "@tanstack/react-query";
import { sanityQueryOptions } from "@/lib/sanity/queryOptions";

export async function loadSanityQuery<const TQuery extends keyof SanityQueries>(
	context: { queryClient: QueryClient },
	query: TQuery,
	params: QueryParams = {},
) {
	const data = await context.queryClient.ensureQueryData(
		sanityQueryOptions({ query, params }),
	);

	return { data, query, params };
}
