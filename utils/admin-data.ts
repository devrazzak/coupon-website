export type AdminStatus = 'active' | 'inactive' | 'draft' | 'published' | 'expired';

export type MediaRecord = {
    id: string;
    fileName: string;
    url: string;
    mimeType: string;
    fileSize: number;
    width: number;
    height: number;
    altText: string;
    uploadedBy: string;
    createdAt: string;
    updatedAt: string;
    usedBy?: {
        type: 'category' | 'store' | 'coupon' | 'blog';
        id: string;
        name: string;
    }[];
};

export type CategoryRecord = {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    status: boolean;
    featured: boolean;
    displayOrder: number;
    metaTitle: string;
    metaDescription: string;
};

export type StoreRecord = {
    id: string;
    name: string;
    slug: string;
    logo: string;
    coverImage: string;
    shortDescription: string;
    description: string;
    categories: string[];
    websiteUrl: string;
    affiliateUrl: string;
    status: AdminStatus;
    featured: boolean;
    popular: boolean;
    verified: boolean;
    displayOrder: number;
    metaTitle: string;
    metaDescription: string;
    createdAt: string;
};

export type CouponRecord = {
    id: string;
    store: string;
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    type: 'Code' | 'Deal';
    code: string;
    discountType: 'Percent' | 'Fixed' | 'Cashback';
    discountValue: string;
    minimumPurchase: string;
    maximumDiscount: string;
    membershipRequirement: string;
    restrictions: string;
    terms: string;
    startDate: string;
    expirationDate: string;
    alwaysActive: boolean;
    verified: boolean;
    verificationDate: string;
    lastTestedDate: string;
    verificationNotes: string;
    featured: boolean;
    popular: boolean;
    trending: boolean;
    displayOrder: number;
    affiliateUrl: string;
    destinationUrl: string;
    metaTitle: string;
    metaDescription: string;
    status: AdminStatus;
};

export type BlogRecord = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    thumbnail: string;
    category: string;
    tags: string[];
    author: string;
    status: 'draft' | 'published';
    featured: boolean;
    trending: boolean;
    publishedDate: string;
    updatedDate: string;
    readingTime: string;
    displayOrder: number;
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    content: string;
};

export const categoryData: CategoryRecord[] = [
    {
        id: 'cat-fashion',
        name: 'Fashion',
        slug: 'fashion',
        description: 'Style updates, wardrobe essentials and seasonal discounts.',
        image: '',
        status: true,
        featured: true,
        displayOrder: 1,
        metaTitle: 'Fashion Deals',
        metaDescription: 'Discover the latest fashion discounts and deals.',
    },
];

export const storeData: StoreRecord[] = [
    {
        id: 'store-nike',
        name: 'Nike',
        slug: 'nike',
        logo: 'https://logo.clearbit.com/nike.com',
        coverImage: '',
        shortDescription: 'Performance gear and lifestyle essentials.',
        description:
            'Nike delivers high-performance training and everyday style essentials across footwear, apparel and accessories.',
        categories: ['Fashion', 'Sports'],
        websiteUrl: 'https://www.nike.com',
        affiliateUrl: 'https://www.nike.com/affiliate',
        status: 'active',
        featured: true,
        popular: true,
        verified: true,
        displayOrder: 1,
        metaTitle: 'Nike Coupons and Deals',
        metaDescription: 'Explore current Nike coupons, promo codes and seasonal offers.',
        createdAt: '2025-01-12',
    },
    {
        id: 'store-amazon',
        name: 'Amazon',
        slug: 'amazon',
        logo: 'https://logo.clearbit.com/amazon.com',
        coverImage: '',
        shortDescription: 'Massive marketplace for everyday essentials.',
        description:
            'Amazon offers millions of products, from electronics to home essentials and beauty favorites.',
        categories: ['Electronics', 'Home', 'Beauty'],
        websiteUrl: 'https://www.amazon.com',
        affiliateUrl: 'https://www.amazon.com/gp/browse.html?node=...',
        status: 'active',
        featured: true,
        popular: true,
        verified: true,
        displayOrder: 2,
        metaTitle: 'Amazon Deals & Coupons',
        metaDescription: 'Browse verified Amazon deal and coupon offers across top categories.',
        createdAt: '2025-02-08',
    },
    {
        id: 'store-uber',
        name: 'Uber Eats',
        slug: 'uber-eats',
        logo: 'https://logo.clearbit.com/ubereats.com',
        coverImage: '',
        shortDescription: 'Food delivery savings and local restaurant deals.',
        description:
            'Order meals and snacks from your favorite local restaurants with fresh delivery offers.',
        categories: ['Food & Dining'],
        websiteUrl: 'https://www.ubereats.com',
        affiliateUrl: 'https://www.ubereats.com/affiliate',
        status: 'active',
        featured: false,
        popular: false,
        verified: true,
        displayOrder: 3,
        metaTitle: 'Uber Eats Promo Codes',
        metaDescription: 'Find Uber Eats discounts and delivery promo codes.',
        createdAt: '2025-02-14',
    },
    {
        id: 'store-booking',
        name: 'Booking.com',
        slug: 'booking-com',
        logo: 'https://logo.clearbit.com/booking.com',
        coverImage: '',
        shortDescription: 'Travel and accommodation savings.',
        description: 'Book stays, getaways and city breaks with flexible travel and hotel savings.',
        categories: ['Travel'],
        websiteUrl: 'https://www.booking.com',
        affiliateUrl: 'https://www.booking.com/affiliate',
        status: 'inactive',
        featured: false,
        popular: false,
        verified: false,
        displayOrder: 4,
        metaTitle: 'Booking.com Coupons',
        metaDescription: 'Find hotel deals and booking discounts for your next trip.',
        createdAt: '2025-03-12',
    },
];

export const couponData: CouponRecord[] = [
    {
        id: 'coupon-nike-20',
        store: 'Nike',
        title: 'Nike extra 20% off sitewide',
        slug: 'nike-extra-20-off-sitewide',
        shortDescription: 'Extra savings on apparel and footwear.',
        description: 'Enjoy an additional 20% on selected athletic styles and essentials.',
        type: 'Code',
        code: 'NIKE20',
        discountType: 'Percent',
        discountValue: '20%',
        minimumPurchase: '$75',
        maximumDiscount: '$100',
        membershipRequirement: 'Nike member',
        restrictions: 'Excludes gift cards and final sale items.',
        terms: 'Valid on eligible products until expiration date.',
        startDate: '2026-08-01',
        expirationDate: '2026-08-31',
        alwaysActive: false,
        verified: true,
        verificationDate: '2026-08-25',
        lastTestedDate: '2026-08-29',
        verificationNotes: 'Code remains valid and tested successfully.',
        featured: true,
        popular: true,
        trending: true,
        displayOrder: 1,
        affiliateUrl: 'https://www.nike.com/affiliate/NIKE20',
        destinationUrl: 'https://www.nike.com',
        metaTitle: 'Nike promo code',
        metaDescription: 'Use the Nike promo code to save 20% on qualifying purchases.',
        status: 'active',
    },
    {
        id: 'coupon-amazon-70',
        store: 'Amazon',
        title: 'Up to 70% off Amazon bestsellers',
        slug: 'amazon-bestsellers-up-to-70-off',
        shortDescription: 'Top-rated picks with strong seasonal discounts.',
        description: 'Save on bestselling electronics, home items and everyday favorites.',
        type: 'Deal',
        code: 'AMZ70',
        discountType: 'Percent',
        discountValue: '70%',
        minimumPurchase: 'None',
        maximumDiscount: 'N/A',
        membershipRequirement: 'None',
        restrictions: 'Offer varies by item and stock availability.',
        terms: 'Applies to participating products only.',
        startDate: '2026-08-05',
        expirationDate: '2026-09-05',
        alwaysActive: false,
        verified: true,
        verificationDate: '2026-08-26',
        lastTestedDate: '2026-08-29',
        verificationNotes: 'Offer updated and still valid.',
        featured: true,
        popular: false,
        trending: true,
        displayOrder: 2,
        affiliateUrl: 'https://www.amazon.com/affiliate/AMZ70',
        destinationUrl: 'https://www.amazon.com',
        metaTitle: 'Amazon deal',
        metaDescription: 'Check the latest Amazon bestsellers discount deals.',
        status: 'active',
    },
    {
        id: 'coupon-uber-fifty',
        store: 'Uber Eats',
        title: '50% off first food order',
        slug: 'uber-eats-50-off-first-order',
        shortDescription: 'Delivery savings on first-time orders.',
        description: 'Get an instant discount on eligible first purchases from local restaurants.',
        type: 'Code',
        code: 'EATNOW50',
        discountType: 'Percent',
        discountValue: '50%',
        minimumPurchase: '$15',
        maximumDiscount: '$15',
        membershipRequirement: 'New users only',
        restrictions: 'Minimum spend required. Some restaurants excluded.',
        terms: 'One use per account. Subject to restaurant availability.',
        startDate: '2026-08-10',
        expirationDate: '2026-09-10',
        alwaysActive: false,
        verified: true,
        verificationDate: '2026-08-27',
        lastTestedDate: '2026-08-29',
        verificationNotes: 'Code works on eligible orders.',
        featured: false,
        popular: true,
        trending: false,
        displayOrder: 3,
        affiliateUrl: 'https://www.uber.com/affiliate/EATNOW50',
        destinationUrl: 'https://www.ubereats.com',
        metaTitle: 'Uber Eats promo code',
        metaDescription: 'Use the Uber Eats promo code to save on delivery orders.',
        status: 'active',
    },
];

export const blogData: BlogRecord[] = [
    {
        id: 'blog-smart-shopping',
        title: '10 Smart Ways to Save Money While Shopping Online',
        slug: 'smart-ways-to-save-money-online',
        excerpt: 'A practical guide to optimizing your shopping habits and stacking savings.',
        featuredImage:
            'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1200&q=80',
        thumbnail:
            'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=600&q=80',
        category: 'Shopping Tips',
        tags: ['shopping', 'budgeting', 'savings'],
        author: 'Maya Brooks',
        status: 'published',
        featured: true,
        trending: true,
        publishedDate: '2026-05-15',
        updatedDate: '2026-05-19',
        readingTime: '5 min read',
        displayOrder: 1,
        metaTitle: 'Smart Ways to Save Money Online',
        metaDescription:
            'Learn strategies for finding better deals and spending more intentionally.',
        canonicalUrl: '/blog/smart-ways-to-save-money-online',
        ogTitle: 'Smart ways to save on online shopping',
        ogDescription: 'Build smarter savings habits and stack the best deals.',
        ogImage:
            'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1200&q=80',
        content:
            'The best way to save money online is to plan purchases, compare discounts, and use verified codes before checkout. When you combine smart timing with clear budgeting, you can reduce spend without sacrificing quality.',
    },
    {
        id: 'blog-coupons-pro',
        title: 'How to Find and Use Coupons Like a Pro',
        slug: 'how-to-find-and-use-coupons-like-a-pro',
        excerpt: 'Learn the simple habits that help shoppers save without the stress.',
        featuredImage:
            'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
        thumbnail:
            'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=600&q=80',
        category: 'Deals Guide',
        tags: ['coupons', 'tips', 'deals'],
        author: 'Oliver Chen',
        status: 'published',
        featured: false,
        trending: false,
        publishedDate: '2026-05-10',
        updatedDate: '2026-05-12',
        readingTime: '4 min read',
        displayOrder: 2,
        metaTitle: 'How to Use Coupons Like a Pro',
        metaDescription: 'Use these coupon strategies to save more on everyday purchases.',
        canonicalUrl: '/blog/how-to-find-and-use-coupons-like-a-pro',
        ogTitle: 'Coupon strategies that work',
        ogDescription: 'Find how to compare offers and activate the best deals quickly.',
        ogImage:
            'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
        content:
            'The key is to match your shopping categories with the right offer sources, review restrictions, and always verify the expiration date before checkout.',
    },
    {
        id: 'blog-summer-deals',
        title: 'Best Summer Deals You Shouldn’t Miss',
        slug: 'best-summer-deals-you-shouldnt-miss',
        excerpt: 'Seasonal deal opportunities across fashion, travel and home purchases.',
        featuredImage:
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        thumbnail:
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
        category: 'Seasonal Deals',
        tags: ['summer', 'seasonal', 'discounts'],
        author: 'Alicia Ross',
        status: 'draft',
        featured: false,
        trending: true,
        publishedDate: '2026-05-05',
        updatedDate: '2026-05-07',
        readingTime: '6 min read',
        displayOrder: 3,
        metaTitle: 'Summer Deals to Watch',
        metaDescription: 'Explore the hottest seasonal savings to consider this month.',
        canonicalUrl: '/blog/best-summer-deals-you-shouldnt-miss',
        ogTitle: 'Best summer deals right now',
        ogDescription: 'Look for the hottest seasonal picks across shopping categories.',
        ogImage:
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        content:
            'Summer shopping tends to peak in travel, beauty and home categories. Watch for stacked offers and short seasonal windows.',
    },
];

export const mediaData: MediaRecord[] = [
    {
        id: 'media-nike-hero',
        fileName: 'nike-hero.jpg',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
        mimeType: 'image/jpeg',
        fileSize: 245000,
        width: 1200,
        height: 800,
        altText: 'Nike product hero image',
        uploadedBy: 'admin',
        createdAt: '2026-08-15',
        updatedAt: '2026-08-15',
        usedBy: [{ type: 'store', id: 'store-nike', name: 'Nike' }],
    },
    {
        id: 'media-fashion-cat',
        fileName: 'fashion-category.jpg',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
        mimeType: 'image/jpeg',
        fileSize: 189000,
        width: 800,
        height: 600,
        altText: 'Fashion category image',
        uploadedBy: 'admin',
        createdAt: '2026-08-10',
        updatedAt: '2026-08-10',
        usedBy: [{ type: 'category', id: 'cat-fashion', name: 'Fashion' }],
    },
    {
        id: 'media-amazon-logo',
        fileName: 'amazon-logo.png',
        url: 'https://logo.clearbit.com/amazon.com',
        mimeType: 'image/png',
        fileSize: 45000,
        width: 200,
        height: 200,
        altText: 'Amazon logo',
        uploadedBy: 'admin',
        createdAt: '2026-08-08',
        updatedAt: '2026-08-08',
        usedBy: [{ type: 'store', id: 'store-amazon', name: 'Amazon' }],
    },
    {
        id: 'media-blog-shopping',
        fileName: 'smart-shopping-guide.jpg',
        url: 'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1200&q=80',
        mimeType: 'image/jpeg',
        fileSize: 267000,
        width: 1200,
        height: 800,
        altText: 'Shopping guide featured image',
        uploadedBy: 'admin',
        createdAt: '2026-05-14',
        updatedAt: '2026-05-14',
        usedBy: [
            {
                type: 'blog',
                id: 'blog-smart-shopping',
                name: '10 Smart Ways to Save Money While Shopping Online',
            },
        ],
    },
    {
        id: 'media-electronics-cat',
        fileName: 'electronics-category.jpg',
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        mimeType: 'image/jpeg',
        fileSize: 156000,
        width: 800,
        height: 600,
        altText: 'Electronics category image',
        uploadedBy: 'admin',
        createdAt: '2026-07-20',
        updatedAt: '2026-07-20',
        usedBy: [],
    },
    {
        id: 'media-travel-cat',
        fileName: 'travel-category.jpg',
        url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
        mimeType: 'image/jpeg',
        fileSize: 198000,
        width: 800,
        height: 600,
        altText: 'Travel category image',
        uploadedBy: 'admin',
        createdAt: '2026-07-15',
        updatedAt: '2026-07-15',
        usedBy: [],
    },
];
