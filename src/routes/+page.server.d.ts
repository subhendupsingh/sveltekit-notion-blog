export declare const config: {
    isr: {
        expiration: boolean;
        bypassToken: undefined;
    };
};
export declare const load: () => Promise<{
    error: {
        code: number;
        message: string;
    };
    pages?: undefined;
    settings?: undefined;
    seo?: undefined;
} | {
    pages: import("../lib/types").PageObjectResponse[];
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
