import { API_END_POINTS } from '@/api/APIEndpoint';
import AxiosServices from '@/api/AxiosService';

// Axios service for get media
export const getMedia = (page: number, limit: number) => {
    return AxiosServices.get(API_END_POINTS.DASHBOARD.MEDIA.GET(page, limit), {});
};

// Axios service for upload media
export const uploadMedia = (data: { file: File; altText?: string }) => {
    const formData = new FormData();
    formData.append('file', data.file);

    if (data.altText && data.altText.trim()) {
        formData.append('alt_text', data.altText.trim());
    }

    return AxiosServices.post(API_END_POINTS.DASHBOARD.MEDIA.POST, formData, false, true);
};

// Axios service for delete media
export const deleteMedia = (id: string | number) => {
    return AxiosServices.remove(API_END_POINTS.DASHBOARD.MEDIA.DELETE(String(id)));
};
