import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteMedia, getMedia, uploadMedia } from '@/utils/api/media';

export const uploadMediaRequest = async (data: { file: File; altText?: string }) => {
    return uploadMedia(data);
};

export const deleteMediaRequest = async (id: string | number) => {
    return deleteMedia(id);
};

// Custom hook using useQuery for get media
export function useGetMedia(page = 1, limit = 10) {
    return useQuery({
        queryKey: ['GetMedia', page, limit],
        queryFn: () => getMedia(page, limit),
        retry: false,
    });
}

// Custom hook using useMutation for upload media
export function useUploadMedia() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['uploadMedia'],
        mutationFn: (data: { file: File; altText?: string }) => uploadMediaRequest(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetMedia'] });
        },
    });
}

// Custom hook using useMutation for delete media
export function useDeleteMedia() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['deleteMedia'],
        mutationFn: (id: string | number) => deleteMediaRequest(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetMedia'] });
        },
    });
}
