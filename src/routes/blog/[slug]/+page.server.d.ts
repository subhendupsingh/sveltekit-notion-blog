export declare const config: {
    isr: {
        expiration: number;
        bypassToken: any;
    };
};
export declare const load: (event: any) => Promise<{
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
} | {
    blocks: import("@notionhq/client/build/src/api-endpoints").BlockObjectResponse[];
    title: string | undefined;
    description: string | undefined;
    cover: string | undefined;
    slug: string;
    published: string | undefined;
    author: import("@notionhq/client/build/src/api-endpoints").UserObjectResponse | undefined;
    faqs: import("../../../lib/types").FAQ[] | null;
    error?: undefined;
} | undefined>;
