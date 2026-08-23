import api from '@/services/api';
import type { User } from '@/types/auth';
import { useQuery } from '@tanstack/react-query';

export function useUser(userId: string) {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            const { data } = await api.get<User>(`/users/${userId}`);
            return data;
        },
    });
}
