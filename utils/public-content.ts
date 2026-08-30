import blog1 from '@/public/images/blog-1.jpg';
import blog2 from '@/public/images/blog-2.jpg';
import blog3 from '@/public/images/blog-3.jpg';
import blog4 from '@/public/images/blog-4.jpg';

export type CouponListItem = {
    id: string;
    slug: string;
    store: string;
    domain: string;
    wordmark: string;
    accentClass: string;
    discount: string;
    title: string;
    description: string;
    code: string;
    uses: string;
    type: 'Code' | 'Deal';
    badge?: { label: string; tone: 'green' | 'amber' };
    expires: string;
    category: string;
    verified: boolean;
};

export type StoreDirectoryItem = {
    slug: string;
    name: string;
    domain: string;
    description: string;
    category: string;
    couponCount: number;
    popular: boolean;
};

export type CategoryDirectoryItem = {
    slug: string;
    name: string;
    description: string;
    icon: string;
    couponCount: number;
    popular: boolean;
};

export type BlogPostItem = {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    updated?: string;
    readTime: string;
    image: typeof blog1;
    featured?: boolean;
};

export const coupons: CouponListItem[] = [
    {
        id: 'nike-extra-20-off-sitewide',
        slug: 'nike-extra-20-off-sitewide',
        store: 'Nike',
        domain: 'nike.com',
        wordmark: 'NIKE',
        accentClass: 'text-foreground tracking-tight',
        discount: '20% OFF',
        title: 'Extra 20% OFF Sitewide at Nike',
        description:
            'Get an extra discount on apparel, sneakers and accessories with a Nike member offer.',
        code: 'NIKE20',
        uses: '1.2K used today',
        type: 'Code',
        badge: { label: 'Most Popular', tone: 'amber' },
        expires: 'Ends in 2 days',
        category: 'Fashion',
        verified: true,
    },
    {
        id: 'asos-flat-60-off-fashion',
        slug: 'asos-flat-60-off-fashion',
        store: 'ASOS',
        domain: 'asos.com',
        wordmark: 'ASOS',
        accentClass: 'text-foreground tracking-wide',
        discount: '60% OFF',
        title: 'Flat 60% OFF on Fashion Styles',
        description:
            'Fresh picks across dresses, streetwear and statement essentials with no minimum.',
        code: 'ASOSFLAT60',
        uses: '890 used today',
        type: 'Code',
        badge: { label: 'Trending', tone: 'green' },
        expires: 'Ends in 3 days',
        category: 'Fashion',
        verified: true,
    },
    {
        id: 'amazon-bestsellers-up-to-70-off',
        slug: 'amazon-bestsellers-up-to-70-off',
        store: 'Amazon',
        domain: 'amazon.com',
        wordmark: 'amazon',
        accentClass: 'text-foreground',
        discount: 'Up to 70% OFF',
        title: 'Up to 70% OFF on Bestsellers',
        description: 'Explore discounts on top electronics, home essentials and popular picks.',
        code: 'AMZDEAL70',
        uses: '2.5K used today',
        type: 'Deal',
        expires: 'Ends in 5 days',
        category: 'Electronics',
        verified: true,
    },
    {
        id: 'best-buy-100-off-laptops',
        slug: 'best-buy-100-off-laptops',
        store: 'Best Buy',
        domain: 'bestbuy.com',
        wordmark: 'BestBuy',
        accentClass: 'text-info',
        discount: '$100 OFF',
        title: '$100 OFF Laptops & Tablets',
        description: 'Save on premium tech when shopping select laptop and tablet models.',
        code: 'BBTECH100',
        uses: '620 used today',
        type: 'Code',
        expires: 'Ends in 6 days',
        category: 'Electronics',
        verified: true,
    },
    {
        id: 'booking-15-off-next-hotel',
        slug: 'booking-15-off-next-hotel',
        store: 'Booking.com',
        domain: 'booking.com',
        wordmark: 'Booking',
        accentClass: 'text-info',
        discount: '15% OFF',
        title: '15% OFF Your Next Hotel Stay',
        description: 'Stack your Genius booking savings on eligible stays and short breaks.',
        code: 'STAY15NOW',
        uses: '312 used today',
        type: 'Code',
        expires: 'Ends in 6 days',
        category: 'Travel',
        verified: true,
    },
    {
        id: 'sephora-extra-25-off-beauty',
        slug: 'sephora-extra-25-off-beauty',
        store: 'Sephora',
        domain: 'sephora.com',
        wordmark: 'SEPHORA',
        accentClass: 'text-foreground tracking-widest',
        discount: '25% OFF',
        title: 'Extra 25% OFF Beauty Picks',
        description:
            'Enjoy savings on skincare, makeup and gifting favorites with a minimum purchase.',
        code: 'BEAUTY25',
        uses: '440 used today',
        type: 'Code',
        expires: 'Ends in 8 days',
        category: 'Beauty',
        verified: true,
    },
    {
        id: 'uber-eats-50-off-food',
        slug: 'uber-eats-50-off-food',
        store: 'Uber Eats',
        domain: 'ubereats.com',
        wordmark: 'UberEats',
        accentClass: 'text-foreground',
        discount: '50% OFF',
        title: '50% OFF up to $15 on Food Orders',
        description: 'Make the most of a foodie offer on your first two delivery orders.',
        code: 'EATNOW50',
        uses: '3.1K used today',
        type: 'Code',
        expires: 'Ends in 4 days',
        category: 'Food',
        verified: true,
    },
    {
        id: 'target-40-off-home-essentials',
        slug: 'target-40-off-home-essentials',
        store: 'Target',
        domain: 'target.com',
        wordmark: 'Target',
        accentClass: 'text-destructive',
        discount: '40% OFF',
        title: '40% OFF Home Essentials',
        description:
            'Refresh your home with standout savings on kitchen, décor and everyday picks.',
        code: 'HOME40',
        uses: '1.8K used today',
        type: 'Deal',
        expires: 'Ends in 9 days',
        category: 'Home & Living',
        verified: true,
    },
];

export const stores: StoreDirectoryItem[] = [
    {
        slug: 'amazon',
        name: 'Amazon',
        domain: 'amazon.com',
        description:
            'Shop tech, home essentials, beauty favorites and everyday deals from a massive online marketplace.',
        category: 'Electronics',
        couponCount: 266,
        popular: true,
    },
    {
        slug: 'nike',
        name: 'Nike',
        domain: 'nike.com',
        description:
            'Performance gear, sneakers and activewear for training, running and lifestyle wear.',
        category: 'Fashion',
        couponCount: 143,
        popular: true,
    },
    {
        slug: 'walmart',
        name: 'Walmart',
        domain: 'walmart.com',
        description:
            'Everyday low prices on groceries, household essentials, electronics and home upgrades.',
        category: 'Home & Living',
        couponCount: 212,
        popular: true,
    },
    {
        slug: 'adidas',
        name: 'Adidas',
        domain: 'adidas.com',
        description:
            'Premium sportswear, sneakers and training gear with frequent seasonal promotions.',
        category: 'Fashion',
        couponCount: 118,
        popular: false,
    },
    {
        slug: 'target',
        name: 'Target',
        domain: 'target.com',
        description:
            'A curated mix of home, beauty, essentials and seasonal finds with everyday value.',
        category: 'Home & Living',
        couponCount: 199,
        popular: true,
    },
    {
        slug: 'sephora',
        name: 'Sephora',
        domain: 'sephora.com',
        description:
            'Beauty essentials, makeup, skincare and self-care favorites from top designer brands.',
        category: 'Beauty',
        couponCount: 91,
        popular: false,
    },
    {
        slug: 'booking-com',
        name: 'Booking.com',
        domain: 'booking.com',
        description:
            'Plan stays, city breaks and travel experiences with flexible booking options.',
        category: 'Travel',
        couponCount: 64,
        popular: false,
    },
    {
        slug: 'best-buy',
        name: 'Best Buy',
        domain: 'bestbuy.com',
        description:
            'Find tech essentials including laptops, TVs, gaming gear and smart home upgrades.',
        category: 'Electronics',
        couponCount: 52,
        popular: false,
    },
    {
        slug: 'asos',
        name: 'ASOS',
        domain: 'asos.com',
        description:
            'On-trend fashion, accessories and labels for modern style and seasonal wardrobes.',
        category: 'Fashion',
        couponCount: 87,
        popular: true,
    },
    {
        slug: 'uber-eats',
        name: 'Uber Eats',
        domain: 'ubereats.com',
        description:
            'Discover delivery deals for your favorite meals, snacks and local restaurants.',
        category: 'Food & Dining',
        couponCount: 48,
        popular: false,
    },
];

export const categories: CategoryDirectoryItem[] = [
    {
        slug: 'fashion',
        name: 'Fashion',
        description: 'Style updates, wardrobe essentials and seasonal discounts.',
        icon: 'shirt',
        couponCount: 1240,
        popular: true,
    },
    {
        slug: 'electronics',
        name: 'Electronics',
        description: 'Tech gadgets, accessories and upgraded home devices.',
        icon: 'laptop',
        couponCount: 943,
        popular: true,
    },
    {
        slug: 'travel',
        name: 'Travel',
        description: 'Flights, getsaways and hotel savings for your next trip.',
        icon: 'plane',
        couponCount: 678,
        popular: true,
    },
    {
        slug: 'beauty',
        name: 'Beauty',
        description: 'Skincare, makeup and wellness essentials from trusted brands.',
        icon: 'sparkles',
        couponCount: 564,
        popular: false,
    },
    {
        slug: 'food-dining',
        name: 'Food & Dining',
        description: 'Restaurant savings, delivery deals and dining offers.',
        icon: 'utensils',
        couponCount: 452,
        popular: false,
    },
    {
        slug: 'fashion',
        name: 'Fashion',
        description: 'Style updates, wardrobe essentials and seasonal discounts.',
        icon: 'shirt',
        couponCount: 1240,
        popular: true,
    },
    {
        slug: 'electronics',
        name: 'Electronics',
        description: 'Tech gadgets, accessories and upgraded home devices.',
        icon: 'laptop',
        couponCount: 943,
        popular: true,
    },
    {
        slug: 'travel',
        name: 'Travel',
        description: 'Flights, getsaways and hotel savings for your next trip.',
        icon: 'plane',
        couponCount: 678,
        popular: true,
    },
    {
        slug: 'beauty',
        name: 'Beauty',
        description: 'Skincare, makeup and wellness essentials from trusted brands.',
        icon: 'sparkles',
        couponCount: 564,
        popular: false,
    },
    {
        slug: 'food-dining',
        name: 'Food & Dining',
        description: 'Restaurant savings, delivery deals and dining offers.',
        icon: 'utensils',
        couponCount: 452,
        popular: false,
    },
    {
        slug: 'health-fitness',
        name: 'Health & Fitness',
        description: 'Workout gear, wellness products and active lifestyle finds.',
        icon: 'heart',
        couponCount: 312,
        popular: false,
    },
    {
        slug: 'home-living',
        name: 'Home & Living',
        description: 'Fresh home finds, décor upgrades and everyday essentials.',
        icon: 'home',
        couponCount: 489,
        popular: false,
    },
    {
        slug: 'fashion',
        name: 'Fashion',
        description: 'Style updates, wardrobe essentials and seasonal discounts.',
        icon: 'shirt',
        couponCount: 1240,
        popular: true,
    },
    {
        slug: 'electronics',
        name: 'Electronics',
        description: 'Tech gadgets, accessories and upgraded home devices.',
        icon: 'laptop',
        couponCount: 943,
        popular: true,
    },
    {
        slug: 'travel',
        name: 'Travel',
        description: 'Flights, getsaways and hotel savings for your next trip.',
        icon: 'plane',
        couponCount: 678,
        popular: true,
    },
    {
        slug: 'beauty',
        name: 'Beauty',
        description: 'Skincare, makeup and wellness essentials from trusted brands.',
        icon: 'sparkles',
        couponCount: 564,
        popular: false,
    },
    {
        slug: 'food-dining',
        name: 'Food & Dining',
        description: 'Restaurant savings, delivery deals and dining offers.',
        icon: 'utensils',
        couponCount: 452,
        popular: false,
    },
    {
        slug: 'health-fitness',
        name: 'Health & Fitness',
        description: 'Workout gear, wellness products and active lifestyle finds.',
        icon: 'heart',
        couponCount: 312,
        popular: false,
    },
    {
        slug: 'fashion',
        name: 'Fashion',
        description: 'Style updates, wardrobe essentials and seasonal discounts.',
        icon: 'shirt',
        couponCount: 1240,
        popular: true,
    },
    {
        slug: 'electronics',
        name: 'Electronics',
        description: 'Tech gadgets, accessories and upgraded home devices.',
        icon: 'laptop',
        couponCount: 943,
        popular: true,
    },
    {
        slug: 'travel',
        name: 'Travel',
        description: 'Flights, getsaways and hotel savings for your next trip.',
        icon: 'plane',
        couponCount: 678,
        popular: true,
    },
    {
        slug: 'beauty',
        name: 'Beauty',
        description: 'Skincare, makeup and wellness essentials from trusted brands.',
        icon: 'sparkles',
        couponCount: 564,
        popular: false,
    },
    {
        slug: 'food-dining',
        name: 'Food & Dining',
        description: 'Restaurant savings, delivery deals and dining offers.',
        icon: 'utensils',
        couponCount: 452,
        popular: false,
    },
    {
        slug: 'health-fitness',
        name: 'Health & Fitness',
        description: 'Workout gear, wellness products and active lifestyle finds.',
        icon: 'heart',
        couponCount: 312,
        popular: false,
    },
    {
        slug: 'home-living',
        name: 'Home & Living',
        description: 'Fresh home finds, décor upgrades and everyday essentials.',
        icon: 'home',
        couponCount: 489,
        popular: false,
    },
    {
        slug: 'all-categories',
        name: 'All Categories',
        description: 'Browse every active savings category in one place.',
        icon: 'grid',
        couponCount: 4800,
        popular: true,
    },
    {
        slug: 'home-living',
        name: 'Home & Living',
        description: 'Fresh home finds, décor upgrades and everyday essentials.',
        icon: 'home',
        couponCount: 489,
        popular: false,
    },
    {
        slug: 'all-categories',
        name: 'All Categories',
        description: 'Browse every active savings category in one place.',
        icon: 'grid',
        couponCount: 4800,
        popular: true,
    },
    {
        slug: 'all-categories',
        name: 'All Categories',
        description: 'Browse every active savings category in one place.',
        icon: 'grid',
        couponCount: 4800,
        popular: true,
    },
    {
        slug: 'fashion',
        name: 'Fashion',
        description: 'Style updates, wardrobe essentials and seasonal discounts.',
        icon: 'shirt',
        couponCount: 1240,
        popular: true,
    },
    {
        slug: 'electronics',
        name: 'Electronics',
        description: 'Tech gadgets, accessories and upgraded home devices.',
        icon: 'laptop',
        couponCount: 943,
        popular: true,
    },
    {
        slug: 'travel',
        name: 'Travel',
        description: 'Flights, getsaways and hotel savings for your next trip.',
        icon: 'plane',
        couponCount: 678,
        popular: true,
    },
    {
        slug: 'beauty',
        name: 'Beauty',
        description: 'Skincare, makeup and wellness essentials from trusted brands.',
        icon: 'sparkles',
        couponCount: 564,
        popular: false,
    },
    {
        slug: 'food-dining',
        name: 'Food & Dining',
        description: 'Restaurant savings, delivery deals and dining offers.',
        icon: 'utensils',
        couponCount: 452,
        popular: false,
    },
    {
        slug: 'health-fitness',
        name: 'Health & Fitness',
        description: 'Workout gear, wellness products and active lifestyle finds.',
        icon: 'heart',
        couponCount: 312,
        popular: false,
    },
    {
        slug: 'home-living',
        name: 'Home & Living',
        description: 'Fresh home finds, décor upgrades and everyday essentials.',
        icon: 'home',
        couponCount: 489,
        popular: false,
    },
    {
        slug: 'all-categories',
        name: 'All Categories',
        description: 'Browse every active savings category in one place.',
        icon: 'grid',
        couponCount: 4800,
        popular: true,
    },
    {
        slug: 'health-fitness',
        name: 'Health & Fitness',
        description: 'Workout gear, wellness products and active lifestyle finds.',
        icon: 'heart',
        couponCount: 312,
        popular: false,
    },
    {
        slug: 'home-living',
        name: 'Home & Living',
        description: 'Fresh home finds, décor upgrades and everyday essentials.',
        icon: 'home',
        couponCount: 489,
        popular: false,
    },
    {
        slug: 'all-categories',
        name: 'All Categories',
        description: 'Browse every active savings category in one place.',
        icon: 'grid',
        couponCount: 4800,
        popular: true,
    },
];

export const blogPosts: BlogPostItem[] = [
    {
        slug: 'smart-ways-to-save-money-online',
        title: '10 Smart Ways to Save Money While Shopping Online',
        excerpt:
            'A practical guide to building better shopping habits, planning purchases and stacking savings without overthinking every transaction.',
        category: 'Shopping Tips',
        author: 'Maya Brooks',
        date: 'May 15, 2026',
        updated: 'May 19, 2026',
        readTime: '5 min read',
        image: blog1,
        featured: true,
    },
    {
        slug: 'how-to-find-and-use-coupons-like-a-pro',
        title: 'How to Find and Use Coupons Like a Pro',
        excerpt:
            'From checking expiration dates to understanding exclusions, these quick steps help you shop smarter and save more.',
        category: 'Deals Guide',
        author: 'Oliver Chen',
        date: 'May 10, 2026',
        readTime: '4 min read',
        image: blog2,
    },
    {
        slug: 'best-summer-deals-you-shouldnt-miss',
        title: "Best Summer Deals & Discounts You Shouldn't Miss",
        excerpt:
            'Seasonal trends, limited-time promos and must-shop categories that are especially worth checking before checkout.',
        category: 'Seasonal Deals',
        author: 'Alicia Ross',
        date: 'May 5, 2026',
        readTime: '6 min read',
        image: blog3,
    },
    {
        slug: 'top-trending-coupons-this-week',
        title: "Top Trending Coupons This Week – Don't Miss Out!",
        excerpt:
            'The hottest offers across fashion, travel and home shopping right now, plus what sets them apart from the rest.',
        category: 'Coupon News',
        author: 'Leo Hart',
        date: 'Apr 28, 2026',
        readTime: '3 min read',
        image: blog4,
    },
    {
        slug: 'seasonal-shopping-checklist',
        title: 'Your Seasonal Shopping Checklist for Smarter Savings',
        excerpt:
            'Plan beyond impulse buys with a thoughtful checklist that balances value, timing and product fit.',
        category: 'Budgeting',
        author: 'Naomi Price',
        date: 'Apr 20, 2026',
        readTime: '7 min read',
        image: blog2,
    },
    {
        slug: 'how-to-compare-deals-without-overbuying',
        title: 'How to Compare Deals Without Overbuying',
        excerpt:
            'A quick framework for comparing discounts, checking values and finding the better deal without the extra clutter.',
        category: 'Shopping Tips',
        author: 'Chris Quinn',
        date: 'Apr 14, 2026',
        readTime: '4 min read',
        image: blog1,
    },
];

export const faqs = [
    {
        question: 'How do I redeem a coupon on Coupello?',
        answer: 'Browse an offer, reveal or copy the code, then visit the merchant through the provided link and apply the code in checkout.',
    },
    {
        question: 'Are all coupons verified?',
        answer: 'Coupello highlights verified codes and deals, while ensuring offers are clearly labeled and current before they appear in the catalog.',
    },
    {
        question: 'Does Coupello auto-apply discounts?',
        answer: 'No. The platform helps users discover and copy valid coupons, but discounts are applied by the shopper at checkout on the merchant website.',
    },
];

export const legalSections = {
    privacy: [
        'We collect only the information necessary to provide account access, support requests and personalized features.',
        'Cookies and analytics help us understand feature performance and improve the site experience without compromising user privacy.',
        'We do not sell personal data to third parties. We may share information with trusted service providers strictly to operate the platform.',
    ],
    terms: [
        'Users are responsible for checking terms, exclusions and expiration dates before using any offer.',
        'Coupello is a discovery and informational platform and does not guarantee offers remain valid after publication.',
        'We may update these terms at any time to reflect changes in our service, policies or legal requirements.',
    ],
    cookies: [
        'We use cookies to remember preferences, provide analytics and improve page performance.',
        'You can manage cookie settings in your browser and opt out of non-essential analytics when available.',
        'Certain essential cookies are required for the website to work properly and maintain security.',
    ],
    affiliate: [
        'Some offers and merchant links may generate compensation to Coupello through affiliate relationships.',
        'This compensation does not affect the price you pay and does not change the coupon availability shown on the site.',
        'We disclose affiliate partnerships clearly so users can understand how the platform operates.',
    ],
};

export const featurePills = ['Verified codes', 'Fresh deals', 'No auto-apply', 'Trusted merchants'];
