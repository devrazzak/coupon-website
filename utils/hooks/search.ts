import { useQuery } from '@tanstack/react-query';

import { getSearchResults } from '@/utils/api/search';

// Fetches combined search results (stores, coupons, categories) for a query.
// `q` is expected to already be debounced/trimmed by the caller.
export function useGetSearchResults(q: string) {
    return useQuery({
        queryKey: ['GetSearchResults', q],
        queryFn: () => getSearchResults({ q }),
        enabled: Boolean(q && q.trim()),
        retry: false,
    });
}
