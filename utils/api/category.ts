import { API_END_POINTS } from '@/api/APIEndpoint';
import AxiosServices from '@/api/AxiosService';

export type PublicCategory = {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
    short_description?: string | null;
    description?: string | null;
    is_featured?: boolean;
    is_active?: boolean;
    sort_order?: number;
    seo_title?: string;
    meta_description?: string;
};

export type PublicCategoriesResponse = {
    success: boolean;
    message: string;
    data: PublicCategory[];
    meta: {
        currentPage: number;
        totalCount: number;
    };
};

export type PublicCategoryDetailResponse = {
    success: boolean;
    message: string;
    data: PublicCategory;
    meta: null;
};

export type PublicCategoriesQuery = {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
};

// Axios service for get categories (public with pagination and search)
export const getPublicCategories = (page = 1, limit = 20, sort?: string, search?: string) => {
    return AxiosServices.get<PublicCategoriesResponse>(
        API_END_POINTS.PUBLIC.CATEGORY.GET(page, limit, sort, search),
        {},
    );
};

export const getPublicCategoryBySlug = (slug: string) => {
    return AxiosServices.get<PublicCategoryDetailResponse>(
        API_END_POINTS.PUBLIC.CATEGORY.GET_BY_SLUG(slug),
        {},
    );
};

// Backward compatibility alias
export const getCategory = (page = 1, limit = 20) => {
    return getPublicCategories(page, limit);
};

// Axios service for get categories (admin dashboard with pagination)
export const getCategories = (page: number, limit: number) => {
    return AxiosServices.get(API_END_POINTS.DASHBOARD.CATEGORY.GET(page, limit), {});
};

// Axios service for create category
export const createCategory = (data: {
    name: string;
    slug: string;
    image?: string;
    short_description?: string;
    description?: string;
    is_featured?: boolean;
    is_active?: boolean;
    sort_order?: number;
    seo_title?: string;
    meta_description?: string;
}) => {
    return AxiosServices.post(API_END_POINTS.DASHBOARD.CATEGORY.POST, data);
};

// Axios service for update category
export const updateCategory = (
    id: string | number,
    data: {
        name?: string;
        slug?: string;
        image?: string;
        short_description?: string;
        description?: string;
        is_featured?: boolean;
        is_active?: boolean;
        sort_order?: number;
        seo_title?: string;
        meta_description?: string;
    },
) => {
    return AxiosServices.put(API_END_POINTS.DASHBOARD.CATEGORY.PUT(String(id)), data);
};

// Axios service for delete category
export const deleteCategory = (id: string | number) => {
    return AxiosServices.remove(API_END_POINTS.DASHBOARD.CATEGORY.DELETE(String(id)));
};
