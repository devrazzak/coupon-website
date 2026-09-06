import { API_END_POINTS } from '@/api/APIEndpoint';
import AxiosServices from '@/api/AxiosService';

export type ContactRequest = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export type ContactResponse = {
    success: boolean;
    message: string;
    data: {
        id: number;
        name: string;
        email: string;
        subject: string;
        message: string;
        is_reply: boolean;
        created_at: string;
        updated_at: string;
    };
    meta: null;
};

export type AdminContactRequest = ContactResponse['data'];

export type AdminContactResponse = {
    success: boolean;
    message: string;
    data: AdminContactRequest[];
    meta: {
        currentPage: number;
        perPage: number;
        totalCount: number;
        totalPages: number;
    };
};

export const submitContactRequest = (data: ContactRequest) =>
    AxiosServices.post<ContactResponse>(API_END_POINTS.PUBLIC.CONTACT.POST, data);

export const getAdminContactRequests = (page = 1, limit = 20, isReply?: boolean) =>
    AxiosServices.get<AdminContactResponse>(
        API_END_POINTS.DASHBOARD.CONTACT.GET(page, limit, isReply),
        {},
    );
