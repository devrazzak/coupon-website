import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import api from '@/services/api';

export function useApiQuery<T>(
    key: string[],
    url: string,
    options?: UseQueryOptions<T, AxiosError>,
) {
    return useQuery<T, AxiosError>({
        queryKey: key,
        queryFn: async () => {
            const { data } = await api.get<T>(url);
            return data;
        },
        ...options,
    });
}

export function useApiMutation<T, V>(url: string, options?: UseMutationOptions<T, AxiosError, V>) {
    return useMutation<T, AxiosError, V>({
        mutationFn: async variables => {
            const { data } = await api.post<T>(url, variables);
            return data;
        },
        ...options,
    });
}
