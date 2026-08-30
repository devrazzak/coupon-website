import { API_END_POINTS } from '@/api/APIEndpoint';
import AxiosServices from '@/api/AxiosService';

// Axios service for login
export const Login = (data: object) => {
    return AxiosServices.post(API_END_POINTS.AUTH.SIGN_IN, data);
};
