import { API_END_POINTS } from '@/api/APIEndpoint';
import AxiosServices from '@/api/AxiosService';

export type BlogCategoryCreatePayload = {
    name: string;
    slug: string;
    description?: string;
    is_active?: boolean;
    sort_order?: number;
};

export type BlogCategoryUpdatePayload = Partial<BlogCategoryCreatePayload>;

export const getBlogCategories = (page: number, limit: number) => {
    return AxiosServices.get(API_END_POINTS.DASHBOARD.BLOG_CATEGORY.GET(page, limit), {});
};

export const createBlogCategory = (data: BlogCategoryCreatePayload) => {
    return AxiosServices.post(API_END_POINTS.DASHBOARD.BLOG_CATEGORY.POST, data);
};

export const updateBlogCategory = (id: string | number, data: BlogCategoryUpdatePayload) => {
    return AxiosServices.put(API_END_POINTS.DASHBOARD.BLOG_CATEGORY.PUT(String(id)), data);
};

export const deleteBlogCategory = (id: string | number) => {
    return AxiosServices.remove(API_END_POINTS.DASHBOARD.BLOG_CATEGORY.DELETE(String(id)));
};
