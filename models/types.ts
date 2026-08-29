export type Program = {
    id: string;
    image: string;
    tag: string;
    title: string;
    description: string;
    intro?: string;
    body?: string[];
    highlights?: string[];
    facts?: Array<{
        label: string;
        value: string;
    }>;
};

export type BlogPost = {
    id: string;
    image: string;
    category: string;
    title: string;
    excerpt: string;
    date: string;
    readingTime: string;
    author: string;
    body: string[];
    takeaways: string[];
};
