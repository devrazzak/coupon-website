import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    type BlogCategoryCreatePayload,
    type BlogCategoryUpdatePayload,
    createBlogCategory,
    deleteBlogCategory,
    getBlogCategories,
    updateBlogCategory,
} from '@/utils/api/blog-category';

export function useGetBlogCategories(page = 1, limit = 10) {
    return useQuery({
        queryKey: ['GetBlogCategories', page, limit],
        queryFn: () => getBlogCategories(page, limit),
        retry: false,
    });
}

export function useCreateBlogCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createBlogCategory'],
        mutationFn: (data: BlogCategoryCreatePayload) => createBlogCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetBlogCategories'] });
        },
    });
}

export function useUpdateBlogCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['updateBlogCategory'],
        mutationFn: ({ id, values }: { id: string | number; values: BlogCategoryUpdatePayload }) =>
            updateBlogCategory(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetBlogCategories'] });
        },
    });
}

export function useDeleteBlogCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['deleteBlogCategory'],
        mutationFn: (id: string | number) => deleteBlogCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetBlogCategories'] });
        },
    });
}
