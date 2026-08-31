import { API_END_POINTS } from '@/api/APIEndpoint';
import AxiosServices from '@/api/AxiosService';

export type BlogCreatePayload = {
    category_id?: number | null;
    title: string;
    slug: string;
    short_description?: string;
    description: string;
    tags?: string[];
    thumbnail?: string;
    is_active?: boolean;
    view_count?: number;
    author?: string;
    featured_image?: string;
    is_featured?: boolean;
    is_trending?: boolean;
    reading_time?: string;
    sort_order?: number;
    published_date?: string;
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
};

export type BlogUpdatePayload = Partial<BlogCreatePayload>;

export const getBlogs = (page: number, limit: number) => {
    return AxiosServices.get(API_END_POINTS.DASHBOARD.BLOG.GET(page, limit), {});
};

export const createBlog = (data: BlogCreatePayload) => {
    return AxiosServices.post(API_END_POINTS.DASHBOARD.BLOG.POST, data);
};

export const updateBlog = (id: string | number, data: BlogUpdatePayload) => {
    return AxiosServices.put(API_END_POINTS.DASHBOARD.BLOG.PUT(String(id)), data);
};

export const deleteBlog = (id: string | number) => {
    return AxiosServices.remove(API_END_POINTS.DASHBOARD.BLOG.DELETE(String(id)));
};
