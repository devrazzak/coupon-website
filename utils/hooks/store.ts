import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    type StoreCreatePayload,
    type StoreUpdatePayload,
    createStore,
    deleteStore,
    getStores,
    updateStore,
} from '@/utils/api/store';

export function useGetStores(page = 1, limit = 10) {
    return useQuery({
        queryKey: ['GetStores', page, limit],
        queryFn: () => getStores(page, limit),
        retry: false,
    });
}

export function useCreateStore() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createStore'],
        mutationFn: (data: StoreCreatePayload) => createStore(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetStores'] });
        },
    });
}

export function useUpdateStore() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['updateStore'],
        mutationFn: ({ id, values }: { id: string | number; values: StoreUpdatePayload }) =>
            updateStore(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetStores'] });
        },
    });
}

export function useDeleteStore() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['deleteStore'],
        mutationFn: (id: string | number) => deleteStore(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetStores'] });
        },
    });
}
