import { API_END_POINTS } from '@/api/APIEndpoint';
import AxiosServices from '@/api/AxiosService';

// Axios service for login
export const Login = (data: { email: string; password: string }) => {
    return AxiosServices.post(API_END_POINTS.AUTH.ADMIN_SIGN_IN, data);
};
