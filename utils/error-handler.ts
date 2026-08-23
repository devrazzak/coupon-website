import { AxiosError } from 'axios';

interface ErrorResponse {
    message: string;
    field?: string;
}

export function handleApiError(error: unknown): ErrorResponse {
    if (error instanceof AxiosError) {
        // Handle Axios errors
        if (error.response?.data?.message) {
            return {
                message: error.response.data.message,
                field: error.response.data.field,
            };
        }
        return {
            message:
                error.message || 'An error occurred while making the request',
        };
    }

    if (error instanceof Error) {
        return {
            message: error.message,
        };
    }

    return {
        message: 'An unexpected error occurred',
    };
}

export function getErrorMessage(error: unknown): string {
    return handleApiError(error).message;
}
