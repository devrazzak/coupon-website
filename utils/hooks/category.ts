import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategory,
    updateCategory,
} from '@/utils/api/category';

// Custom hook using useQuery for get category (public)
export function useGetCategory() {
    return useQuery({
        queryKey: ['GetCategory'],
        queryFn: () => getCategory(),
        retry: false,
    });
}

// Custom hook using useQuery for get categories (admin dashboard)
export function useGetCategories(page = 1, limit = 10) {
    return useQuery({
        queryKey: ['GetCategories', page, limit],
        queryFn: () => getCategories(page, limit),
        retry: false,
    });
}

// Custom hook using useMutation for create category
export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createCategory'],
        mutationFn: (data: Parameters<typeof createCategory>[0]) => createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetCategories'] });
            queryClient.invalidateQueries({ queryKey: ['GetCategory'] });
        },
    });
}

// Custom hook using useMutation for update category
export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['updateCategory'],
        mutationFn: (data: { id: string | number; values: Parameters<typeof updateCategory>[1] }) =>
            updateCategory(data.id, data.values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetCategories'] });
            queryClient.invalidateQueries({ queryKey: ['GetCategory'] });
        },
    });
}

// Custom hook using useMutation for delete category
export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['deleteCategory'],
        mutationFn: (id: string | number) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetCategories'] });
            queryClient.invalidateQueries({ queryKey: ['GetCategory'] });
        },
    });
}
