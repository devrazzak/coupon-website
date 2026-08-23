import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { defaultLocale, locales } from './i18n';
import PATHS from './routes/path';

const i18nMiddleware = createMiddleware({
    locales: locales,
    defaultLocale: defaultLocale,
    localePrefix: 'as-needed',
});

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

function getLocalePathname(pathname: string): {
    locale: string;
    pathname: string;
} {
    const segments = pathname.split('/');
    const locale = locales.includes(segments[1]) ? segments[1] : defaultLocale;
    const localizedPathname = locales.includes(segments[1])
        ? `/${segments.slice(2).join('/')}`
        : pathname;

    return {
        locale,
        pathname: localizedPathname === '//' ? '/' : localizedPathname,
    };
}

function localizedUrl(pathname: string, locale: string, request: NextRequest) {
    return new URL(`/${locale}${pathname}`, request.url);
}

// Middleware function
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const { locale, pathname: routePathname } = getLocalePathname(pathname);
    const token = request.cookies.get('token')?.value;
    const userRole = getUserRole(request);

    // Skip middleware for public paths
    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    if (routePathname === '/register') {
        return NextResponse.redirect(localizedUrl(AUTH_PATHS.user, locale, request));
    }

    const isAdminRoute = routePathname.startsWith('/admin');
    const isUserRoute = routePathname.startsWith('/user');
    const currentAuthPath = Object.values(AUTH_PATHS).find(path => routePathname === path);

    // Allow unauthenticated users to access auth pages
    if (!token && currentAuthPath) {
        return i18nMiddleware(request);
    }

    // Redirect unauthenticated users to their respective login pages
    if (!token) {
        if (isAdminRoute)
            return NextResponse.redirect(localizedUrl(AUTH_PATHS.admin, locale, request));
        if (isUserRoute)
            return NextResponse.redirect(localizedUrl(AUTH_PATHS.user, locale, request));
        return i18nMiddleware(request);
    }

    // If token exists but userRole is missing, redirect to default login
    if (!userRole) {
        return NextResponse.redirect(localizedUrl(AUTH_PATHS.user, locale, request));
    }

    // Redirect authenticated users from login pages to their respective dashboard
    if (currentAuthPath) {
        return NextResponse.redirect(localizedUrl(`/${userRole}`, locale, request));
    }

    // Prevent users from accessing other roles' pages
    if ((isAdminRoute && userRole !== 'admin') || (isUserRoute && userRole !== 'user')) {
        return NextResponse.redirect(localizedUrl(`/${userRole}`, locale, request));
    }

    return i18nMiddleware(request);
}

// Apply middleware only to non-public paths
export const config = {
    matcher: ['/((?!_next|api|assets).*)', '/'],
};
