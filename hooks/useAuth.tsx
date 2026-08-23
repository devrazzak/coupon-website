'use client';

import PATHS from '@/routes/path';
import { AuthState, LoginCredentials, User } from '@/types/auth';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function setAuthCookies(token: string, role: string) {
    document.cookie = `token=${token}; path=/; max-age=86400; samesite=strict`;
    document.cookie = `userRole=${role}; path=/; max-age=86400; samesite=strict`;
}

function removeAuthCookies() {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie =
        'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
}

function getAuthCookie(name: string) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    useEffect(() => {
        setMounted(true);
        const storedUser = localStorage.getItem('user');
        const token = getAuthCookie('token');

        if (storedUser && token) {
            const user = JSON.parse(storedUser);
            setState({
                user,
                isAuthenticated: true,
                isLoading: false,
            });
            setAuthCookies(token, user.role);
        } else {
            setState((prev) => ({ ...prev, isLoading: false }));
        }
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            const mockUser: User = {
                id: '1',
                email: credentials.email,
                name: 'John Doe',
                role: credentials.role || 'user',
            };

            const mockToken = btoa(
                JSON.stringify({
                    userId: mockUser.id,
                    role: mockUser.role,
                    timestamp: Date.now(),
                })
            );

            localStorage.setItem('user', JSON.stringify(mockUser));

            setAuthCookies(mockToken, mockUser.role);

            setState({
                user: mockUser,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        const userRole = getAuthCookie('userRole');
        console.log('userRole', userRole);

        if (userRole === 'admin') {
            window.location.href = PATHS.AUTH.ADMIN_LOGIN;
        } else if (userRole === 'partner') {
            window.location.href = PATHS.AUTH.PARTNER_LOGIN;
        } else if (userRole === 'user') {
            window.location.href = PATHS.AUTH.LOGIN;
        }

        localStorage.removeItem('user');
        removeAuthCookies();
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    if (!mounted) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
