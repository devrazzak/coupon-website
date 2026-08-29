import { useQuery } from '@tanstack/react-query';

import type { User } from '@/models/auth';
import api from '@/services/api';

export function useUser(userId: string) {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            const { data } = await api.get<User>(`/users/${userId}`);
            return data;
        },
    });
}
