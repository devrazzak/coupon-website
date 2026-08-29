import blog1 from '@/public/images/blog-1.jpg';
import blog2 from '@/public/images/blog-2.jpg';
import blog3 from '@/public/images/blog-3.jpg';
import blog4 from '@/public/images/blog-4.jpg';

export type Store = {
    name: string;
    domain: string;
    wordmark: string;
    accentClass: string;
    discount: string;
    coupons: string;
};

export const stores: Store[] = [
    {
        name: 'Amazon',
        domain: 'amazon.com',
        wordmark: 'amazon',
        accentClass: 'text-foreground',
        discount: 'Up to 70% OFF',
        coupons: '266 Coupons',
    },
    {
        name: 'Nike',
        domain: 'nike.com',
        wordmark: 'NIKE',
        accentClass: 'text-foreground tracking-tight',
        discount: 'Up to 50% OFF',
        coupons: '143 Coupons',
    },
    {
        name: 'Walmart',
        domain: 'walmart.com',
        wordmark: 'Walmart',
        accentClass: 'text-info',
        discount: 'Up to 65% OFF',
        coupons: '212 Coupons',
    },
    {
        name: 'Adidas',
        domain: 'adidas.com',
        wordmark: 'adidas',
        accentClass: 'text-foreground',
        discount: 'Up to 55% OFF',
        coupons: '118 Coupons',
    },
    {
        name: 'Target',
        domain: 'target.com',
        wordmark: 'Target',
        accentClass: 'text-destructive',
        discount: 'Up to 40% OFF',
        coupons: '199 Coupons',
    },
    {
        name: 'Sephora',
        domain: 'sephora.com',
        wordmark: 'SEPHORA',
        accentClass: 'text-foreground tracking-widest',
        discount: 'Up to 30% OFF',
        coupons: '91 Coupons',
    },
    {
        name: 'Booking.com',
        domain: 'booking.com',
        wordmark: 'Booking',
        accentClass: 'text-info',
        discount: 'Up to 25% OFF',
        coupons: '64 Coupons',
    },
    {
        name: 'Best Buy',
        domain: 'bestbuy.com',
        wordmark: 'BestBuy',
        accentClass: 'text-info',
        discount: 'Up to 45% OFF',
        coupons: '52 Coupons',
    },
    {
        name: 'ASOS',
        domain: 'asos.com',
        wordmark: 'ASOS',
        accentClass: 'text-foreground tracking-wide',
        discount: 'Up to 70% OFF',
        coupons: '87 Coupons',
    },
    {
        name: 'Uber Eats',
        domain: 'ubereats.com',
        wordmark: 'UberEats',
        accentClass: 'text-foreground',
        discount: '50% OFF',
        coupons: '48 Coupons',
    },
];

export type Coupon = {
    id: string;
    store: string;
    domain: string;
    wordmark: string;
    accentClass: string;
    badge?: { label: string; tone: 'green' | 'amber' };
    title: string;
    description: string;
    code: string;
    uses: string;
    expires: string;
    category: string;
};

export const coupons: Coupon[] = [
    {
        id: 'nike20',
        store: 'Nike',
        domain: 'nike.com',
        wordmark: 'NIKE',
        accentClass: 'text-foreground tracking-tight',
        badge: { label: 'Most Popular', tone: 'amber' },
        title: 'Extra 20% OFF Sitewide at Nike',
        description: 'Applicable on orders above $99. Members only.',
        code: 'NIKE20',
        uses: '1.2K used today',
        expires: 'Expires in 2 days',
        category: 'Fashion',
    },
    {
        id: 'asos60',
        store: 'ASOS',
        domain: 'asos.com',
        wordmark: 'ASOS',
        accentClass: 'text-foreground tracking-wide',
        badge: { label: 'Trending', tone: 'green' },
        title: 'Flat 60% OFF on Fashion Styles',
        description: 'No minimum purchase required.',
        code: 'ASOSFLAT60',
        uses: '890 used today',
        expires: 'Expires in 3 days',
        category: 'Fashion',
    },
    {
        id: 'amz70',
        store: 'Amazon',
        domain: 'amazon.com',
        wordmark: 'amazon',
        accentClass: 'text-foreground',
        title: 'Up to 70% OFF on Bestsellers',
        description: 'Across electronics, home & more.',
        code: 'AMZDEAL70',
        uses: '2.5K used today',
        expires: 'Expires in 5 days',
        category: 'Electronics',
    },
    {
        id: 'bestbuy100',
        store: 'Best Buy',
        domain: 'bestbuy.com',
        wordmark: 'BestBuy',
        accentClass: 'text-info',
        title: '$100 OFF Laptops & Tablets',
        description: 'On select models above $799.',
        code: 'BBTECH100',
        uses: '620 used today',
        expires: 'Expires in 6 days',
        category: 'Electronics',
    },
    {
        id: 'booking15',
        store: 'Booking.com',
        domain: 'booking.com',
        wordmark: 'Booking',
        accentClass: 'text-info',
        title: '15% OFF Your Next Hotel Stay',
        description: 'Valid on Genius rate properties.',
        code: 'STAY15NOW',
        uses: '312 used today',
        expires: 'Expires in 6 days',
        category: 'Travel',
    },
    {
        id: 'sephora25',
        store: 'Sephora',
        domain: 'sephora.com',
        wordmark: 'SEPHORA',
        accentClass: 'text-foreground tracking-widest',
        title: 'Extra 25% OFF Beauty Picks',
        description: 'On orders above $60.',
        code: 'BEAUTY25',
        uses: '440 used today',
        expires: 'Expires in 8 days',
        category: 'Beauty',
    },
    {
        id: 'ubereats50',
        store: 'Uber Eats',
        domain: 'ubereats.com',
        wordmark: 'UberEats',
        accentClass: 'text-foreground',
        title: '50% OFF up to $15 on Food Orders',
        description: 'Valid on your first two orders.',
        code: 'EATNOW50',
        uses: '3.1K used today',
        expires: 'Expires in 4 days',
        category: 'Food',
    },
];

export const couponTabs = [
    'All',
    'Popular',
    'Fashion',
    'Electronics',
    'Travel',
    'Food',
    'Beauty',
] as const;

export const categories = [
    { name: 'Fashion', count: '1240+ Coupons', icon: 'shirt' },
    { name: 'Electronics', count: '943+ Coupons', icon: 'laptop' },
    { name: 'Travel', count: '678+ Coupons', icon: 'plane' },
    { name: 'Beauty', count: '564+ Coupons', icon: 'sparkles' },
    { name: 'Food & Dining', count: '452+ Coupons', icon: 'utensils' },
    { name: 'Health & Fitness', count: '312+ Coupons', icon: 'heart' },
    { name: 'Home & Living', count: '489+ Coupons', icon: 'home' },
    { name: 'All Categories', count: 'View All', icon: 'grid' },
] as const;

export const posts = [
    {
        title: '10 Smart Ways to Save Money While Shopping Online',
        category: 'Shopping Tips',
        date: 'May 15, 2026',
        read: '5 min read',
        image: blog1,
    },
    {
        title: 'How to Find and Use Coupons Like a Pro',
        category: 'Deals Guide',
        date: 'May 10, 2026',
        read: '4 min read',
        image: blog2,
    },
    {
        title: "Best Summer Deals & Discounts You Shouldn't Miss",
        category: 'Seasonal Deals',
        date: 'May 5, 2026',
        read: '6 min read',
        image: blog3,
    },
    {
        title: "Top Trending Coupons This Week – Don't Miss Out!",
        category: 'Coupon News',
        date: 'Apr 28, 2026',
        read: '3 min read',
        image: blog4,
    },
];

export const popularSearches = ['Amazon', 'Nike', 'Target', 'ASOS', 'Booking.com', 'Sephora'];
