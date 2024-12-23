import type { ServerLoadEvent } from '@sveltejs/kit';
export declare const load: (event: ServerLoadEvent) => Promise<{
    error: {
        code: number;
        message: string;
    };
    blocks?: undefined;
    title?: undefined;
    description?: undefined;
    cover?: undefined;
    slug?: undefined;
    published?: undefined;
    author?: undefined;
    faqs?: undefined;
    settings?: undefined;
    seo?: undefined;
} | {
    blocks: import("../../../lib/notion/api").CustomBlockObjectResponse[];
    title: string | undefined;
    description: string | undefined;
    cover: string | undefined;
    slug: string;
    published: string | undefined;
    author: import("../../../lib/types").PersonUserObjectResponse | undefined;
    faqs: import("../../../lib/types").FAQ[] | null;
    settings: {
        blogTitle?: string;
        blogDescription?: string;
    };
    seo: {
        siteUrl: string;
        siteName: string;
        siteSlogan?: string;
        twitterHandle?: string;
        logo: string;
        ogImage: string;
    };
    error?: undefined;
} | undefined>;
