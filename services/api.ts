import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                document.cookie =
                    'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
                document.cookie =
                    'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
                // eslint-disable-next-line @next/next/no-location-assign-relative-destination
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
