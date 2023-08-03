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
} | {
    pages: import("@notionhq/client/build/src/api-endpoints").PageObjectResponse[];
    settings: {
        blogTitle: string;
        blogDescription: string;
    };
    error?: undefined;
} | undefined>;
