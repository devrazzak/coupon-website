export type UserRole = 'admin' | 'partner' | 'user';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
    role?: UserRole;
}

export interface AuthResponse {
    user: User;
    token: string;
}
