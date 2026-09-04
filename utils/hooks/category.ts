import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategory,
    getPublicCategories,
    updateCategory,
} from '@/utils/api/category';

// Custom hook using useQuery for public categories
export function useGetPublicCategories(page = 1, limit = 20, sort?: string, search?: string) {
    return useQuery({
        queryKey: ['GetPublicCategories', page, limit, sort, search],
        queryFn: () => getPublicCategories(page, limit, sort, search),
        retry: false,
    });
}

// Custom hook using useQuery for get category (public backward compatibility)
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
            queryClient.invalidateQueries({ queryKey: ['GetPublicCategories'] });
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
            queryClient.invalidateQueries({ queryKey: ['GetPublicCategories'] });
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
            queryClient.invalidateQueries({ queryKey: ['GetPublicCategories'] });
        },
    });
}
