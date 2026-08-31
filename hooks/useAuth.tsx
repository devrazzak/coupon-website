'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { AuthState, LoginCredentials, User } from '@/models/auth';
import PATHS from '@/routes/path';
import { Login } from '@/utils/api/auth';

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
    document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
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

function getInitialAuthState(): AuthState {
    return { user: null, isAuthenticated: false, isLoading: false };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>(getInitialAuthState);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const hydrateAuthState = () => {
            try {
                const storedUser = localStorage.getItem('user');
                const token = localStorage.getItem('token') || getAuthCookie('token');

                if (storedUser && token) {
                    setState({
                        user: JSON.parse(storedUser),
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return;
                }
            } catch {}

            setState({ user: null, isAuthenticated: false, isLoading: false });
        };

        const frameId = requestAnimationFrame(hydrateAuthState);
        return () => cancelAnimationFrame(frameId);
    }, []);

    useEffect(() => {
        if (state.user) {
            const token = localStorage.getItem('token') || getAuthCookie('token');
            if (token) {
                setAuthCookies(token, state.user.role);
            }
        }
    }, [state.user]);

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await Login({
                email: credentials.email,
                password: credentials.password,
            });

            const resData = response?.data as {
                success?: boolean;
                message?: string;
                data?: {
                    user: {
                        id: number | string;
                        name: string;
                        email: string;
                        role: string;
                    };
                    token: string;
                };
            };

            const user = resData?.data?.user;
            const token = resData?.data?.token;

            if (!token || !user) {
                throw new Error(resData?.message || 'Invalid email or password');
            }

            const formattedUser: User = {
                id: String(user.id),
                email: user.email,
                name: user.name,
                role: (user.role as any) || credentials.role || 'admin',
            };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(formattedUser));
            localStorage.setItem(
                'userData',
                JSON.stringify({ token, user: formattedUser, idToken: token }),
            );

            setAuthCookies(token, formattedUser.role);

            setState({
                user: formattedUser,
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

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userData');
        removeAuthCookies();
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });

        if (userRole === 'admin') {
            window.location.href = PATHS.AUTH.ADMIN_LOGIN;
        } else {
            window.location.href = PATHS.AUTH.LOGIN;
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
