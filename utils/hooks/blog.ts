import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    type BlogCreatePayload,
    type BlogUpdatePayload,
    type PublicBlogsQuery,
    createBlog,
    deleteBlog,
    getBlogs,
    getPublicBlogBySlug,
    getPublicBlogs,
    updateBlog,
} from '@/utils/api/blog';

export function useGetPublicBlogs(query: PublicBlogsQuery = {}) {
    return useQuery({
        queryKey: ['GetPublicBlogs', query],
        queryFn: () => getPublicBlogs(query),
        retry: false,
    });
}

export function useGetPublicBlogBySlug(slug: string) {
    return useQuery({
        queryKey: ['GetPublicBlogBySlug', slug],
        queryFn: () => getPublicBlogBySlug(slug),
        retry: false,
        enabled: !!slug,
    });
}

export function useGetBlogs(page = 1, limit = 10) {
    return useQuery({
        queryKey: ['GetBlogs', page, limit],
        queryFn: () => getBlogs(page, limit),
        retry: false,
    });
}

export function useCreateBlog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createBlog'],
        mutationFn: (data: BlogCreatePayload) => createBlog(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetBlogs'] });
        },
    });
}

export function useUpdateBlog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['updateBlog'],
        mutationFn: ({ id, values }: { id: string | number; values: BlogUpdatePayload }) =>
            updateBlog(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetBlogs'] });
        },
    });
}

export function useDeleteBlog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['deleteBlog'],
        mutationFn: (id: string | number) => deleteBlog(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetBlogs'] });
        },
    });
}
