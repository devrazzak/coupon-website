import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import siteConfig from './SiteConfig';

export const pageTitle = (title: string) => {
    document.title = title ? `${title} | ${siteConfig.company_name}` : 'YourWebsiteName';
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
