import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/utils/api/category';

// Custom hook using useQuery for get category
export function useGetCategory() {
    return useQuery({
        queryKey: ['GetCategory'],
        queryFn: () => getCategory(),
        retry: false,
    });
}
