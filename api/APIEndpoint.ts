// import config from "../config";
export const API_END_POINTS = {
    AUTH: {
        SIGN_IN: '/auth/signin',
        SIGN_UP: '/auth/signup',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        ADMIN_SIGN_IN: '/api/v1/auth/login',
    },
    GET_CATEGORY: '/api/v1/categories',
    DASHBOARD: {
        MEDIA: {
            GET: (page: number, limit: number) => `/api/v1/admin/media?page=${page}&limit=${limit}`,
            POST: '/api/v1/admin/media',
            DELETE: (id: string) => `/api/v1/admin/media/${id}`,
        },
        CATEGORY: {
            GET: (page: number, limit: number) =>
                `/api/v1/admin/categories?page=${page}&limit=${limit}`,
            POST: '/api/v1/admin/categories',
            PUT: (id: string) => `/api/v1/admin/categories/${id}`,
            DELETE: (id: string) => `/api/v1/admin/categories/${id}`,
        },
    },
};
