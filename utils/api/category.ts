import { API_END_POINTS } from '@/api/APIEndpoint';
import AxiosServices from '@/api/AxiosService';

// Axios service for get category
export const getCategory = () => {
    return AxiosServices.get(API_END_POINTS.GET_CATEGORY, {});
};
