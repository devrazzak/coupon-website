import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import PATHS from './routes/path';

const PUBLIC_PATHS = ['/_next', '/api', '/assets', '/favicon.ico', '/robots.txt', '/sitemap.xml'];

const AUTH_PATHS = {
    admin: PATHS.AUTH.ADMIN_LOGIN,
    user: PATHS.AUTH.LOGIN,
};

// Helper function to check if a path is public
function isPublicPath(pathname: string): boolean {
    return PUBLIC_PATHS.some(path => pathname.startsWith(path)) || pathname.includes('.');
}

// Helper function to extract user role from cookies
function getUserRole(request: NextRequest): string | null {
    return request.cookies.get('userRole')?.value?.toLowerCase() || null;
}

// Middleware function
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;
    const userRole = getUserRole(request);

    // Skip middleware for public paths
    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    if (pathname === '/register') {
        return NextResponse.redirect(new URL(AUTH_PATHS.user, request.url));
    }

    const isAdminRoute = pathname.startsWith('/admin');
    const isUserRoute = pathname.startsWith('/user');
    const currentAuthPath = Object.values(AUTH_PATHS).find(path => pathname === path);

    // Allow unauthenticated users to access auth pages
    if (!token && currentAuthPath) {
        return NextResponse.next();
    }

    // Redirect unauthenticated users to their respective login pages
    if (!token) {
        if (isAdminRoute) return NextResponse.redirect(new URL(AUTH_PATHS.admin, request.url));
        if (isUserRoute) return NextResponse.redirect(new URL(AUTH_PATHS.user, request.url));
        return NextResponse.next();
    }

    // If token exists but userRole is missing, redirect to default login
    if (!userRole) {
        return NextResponse.redirect(new URL(AUTH_PATHS.user, request.url));
    }

    // Redirect authenticated users from login pages to their respective dashboard
    if (currentAuthPath) {
        return NextResponse.redirect(new URL(`/${userRole}`, request.url));
    }

    // Prevent users from accessing other roles' pages
    if ((isAdminRoute && userRole !== 'admin') || (isUserRoute && userRole !== 'user')) {
        return NextResponse.redirect(new URL(`/${userRole}`, request.url));
    }

    return NextResponse.next();
}

// Apply middleware only to non-public paths
export const config = {
    matcher: ['/((?!_next|api|assets).*)', '/'],
};
