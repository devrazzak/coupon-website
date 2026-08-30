import { useMutation } from '@tanstack/react-query';

import { Login } from '@/utils/api/auth';

// Custom hook using useMutation for login
export function useLogin() {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: Login,
    });
}
