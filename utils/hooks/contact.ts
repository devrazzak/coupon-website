import { useQuery } from '@tanstack/react-query';

import { getAdminContactRequests } from '@/utils/api/contact';

export function useGetAdminContactRequests(page = 1, limit = 20, isReply?: boolean) {
    return useQuery({
        queryKey: ['GetAdminContactRequests', page, limit, isReply],
        queryFn: () => getAdminContactRequests(page, limit, isReply),
        retry: false,
    });
}
