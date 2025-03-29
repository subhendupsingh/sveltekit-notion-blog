import { getBlocks, getBlogSlugs, getDatabaseById, getFAQs, getPageBySlug, groupNumberedListItems } from "./notion/api";
import type { ServerLoadEvent } from "@sveltejs/kit";
import BlogPost from "$lib/components/BlogPost.svelte";
import PostsList from "$lib/components/PostsList.svelte";
import { isFullUser } from "./types/helpers";

type Tokens = { notionToken: string, databaseId: string, vercelByPassToken?: string };
type BlogSettings = { blogTitle?: string, blogDescription?: string };
type BlogSEO = { siteUrl: string, siteName: string, siteSlogan?: string, twitterHandle?: string, logo: string, ogImage: string };
type InitConfig = { tokens: Tokens, settings: BlogSettings, seo: BlogSEO };
export type BlogClient = { config: Tokens, settings: BlogSettings, seo: BlogSEO };

let notionCLient: BlogClient;

export const initNotionBlog = (config: InitConfig): BlogClient | null => {
    if (config?.tokens?.notionToken) {
        notionCLient = { config: config.tokens, settings: config.settings, seo: config.seo };
        return notionCLient;
    } else {
        return null;
    }
}

export const getAllPosts = async () => {
    try {

        if (!notionCLient) {
            return {
                error: {
                    code: 400,
                    message: "Notion client is not initialized"
                }
            }
        }

        const res = await getDatabaseById(notionCLient);

        if (res.isOk()) {
            if (res.value?.length > 0) {
                return {
                    pages: res.value,
                    settings: notionCLient.settings,
                    seo: notionCLient.seo
                }
            } else {
                return {
                    error: {
                        code: 400,
                        message: "Please add rows in the database"
                    }
                }
            }
        }

        if (res.isErr()) {
            return {
                error: {
                    code: res.error.code,
                    message: res.error.message
                }
            }
        }
    } catch (error) {
        return {
            error: {
                code: 500,
                message: "Some error ocurred"
            }
        }
    }
}


export const getBlogPageBySlug = async (event: ServerLoadEvent) => {
    const { slug } = event.params;

    if (!notionCLient) {
        return {
            error: {
                code: 400,
                message: "Notion client is not initialized"
            }
        }
    }

    if (!slug) {
        return {
            error: {
                code: 400,
                message: "Invalid or missing blog slug"
            }
        }
    }

    const response = await getPageBySlug(notionCLient, slug);

    if (response.isOk() && response.value?.length > 0) {
        const page = response.value?.[0];
        const title = page.properties["Title"].type == "title" && page.properties["Title"]?.title?.[0]?.type == "text" ? page.properties["Title"]?.title?.[0]?.text?.content : undefined;
        const description = page.properties["Short Description"]?.type == "rich_text" ? page.properties["Short Description"]?.rich_text?.[0]?.plain_text : undefined;
        const cover = page?.cover?.type == "external" ? page?.cover?.external?.url : undefined;
        const published = page.properties["Publish Date"]?.type == "date" ? page.properties["Publish Date"].date?.start : undefined;
        const author = page.properties["Authors"]?.type == "people" && page.properties["Authors"]?.people?.[0] ? isFullUser(page.properties["Authors"]?.people?.[0]) ? page.properties["Authors"]?.people?.[0] : undefined : undefined;

        if (!page?.id) {
            return {
                error: {
                    code: 500,
                    message: "Invalid or missing page!"
                }
            }
        }

        const blockResponse = await getBlocks(notionCLient, page.id);

        if (blockResponse.isOk()) {
            const blocks = groupNumberedListItems(blockResponse.value);
            const faqsTableId = blocks?.filter((f) => f.type == "table")?.[0]?.id;
            let faqs = null;

            if (faqsTableId) {
                const faqsResponse = await getFAQs(notionCLient, faqsTableId);

                if (faqsResponse.isOk()) {
                    faqs = faqsResponse.value;
                }
            }

            return {
                blocks,
                title,
                description,
                cover,
                slug,
                published,
                author,
                faqs,
                settings: notionCLient.settings,
                seo: notionCLient.seo
            }
        }

        if (blockResponse.isErr()) {
            return {
                error: {
                    code: blockResponse.error.code,
                    message: blockResponse.error.message
                }
            }
        }
    } else {
        return {
            error: {
                code: 500,
                message: "Some error ocurred"
            }
        }
    }

    if (response.isErr()) {
        return {
            error: {
                code: response.error.code,
                message: response.error.message
            }
        }
    }
}

export const getAllBlogSlugs = async () => {

    if (!notionCLient) {
        return {
            error: {
                code: 400,
                message: "Notion client is not initialized"
            }
        }
    }

    const response = await getBlogSlugs(notionCLient);

    if (response.isOk()) {
        return {
            slugs: response.value
        }
    }

    if (response.isErr()) {
        return {
            error: {
                code: response.error.code,
                message: response.error.message
            }
        }
    }
}

export { BlogPost, PostsList }
