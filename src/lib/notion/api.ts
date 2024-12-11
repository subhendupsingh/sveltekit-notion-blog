import type { BlogClient } from "$lib";
import type { BlockObjectResponse, FAQ, ListBlockChildrenResponse, NumberedListItemBlockObjectResponse, PageObjectResponse, UserObjectResponse } from "$lib/types";
import { isFullBlock, isFullPage, isPageObjectResponse } from "$lib/types/helpers";
import { ok, err, Result } from 'neverthrow';

type ErrorResult = { code: number, message: string };

const BASE_URL = "https://api.notion.com/v1";

type ApiResponse<T> = {
    data: T | null;
    error: string | null;
}

const sendRequest = async <T>(url: string, blogClient: BlogClient, method: "GET" | "POST", body?: any): Promise<ApiResponse<T>> => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${blogClient.config.notionToken}`,
        "Notion-Version": "2022-06-28"
    };

    const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
    });

    //get response type
    const contentType = response.headers.get("Content-Type");

    let data: any;

    if (contentType) {
        if (contentType?.indexOf("application/json") > -1) {
            data = await response.json();
        } else {
            data = await response.text();
        }
    }

    if (!response.ok) {
        return {
            error: data,
            data: null
        }
    }

    return {
        error: null,
        data
    };
}

const api = {
    get: async <T>(url: string, blogClient: BlogClient) => {
        return sendRequest<T>(url, blogClient, "GET");
    },
    post: async <T>(url: string, blogClient: BlogClient, body?: any) => {
        return sendRequest<T>(url, blogClient, "POST" ,body);
    }
}

export const getDatabaseById = async (blogClient: BlogClient): Promise<Result<PageObjectResponse[], ErrorResult>> => {
    try {
        const url = `${BASE_URL}/databases/${blogClient.config.databaseId}/query`;
        const notion = blogClient.config.notionToken;

        if (!notion) {
            return err({ code: 400, message: "Invalid or missing notion secret" });
        }

        const database = await api.post<{ object: "list", results: PageObjectResponse[] }>(url, blogClient, {
            "filter": {
                "property": "Published",
                "checkbox": {
                    "equals": true
                }
            }
        });

        const results = database.data?.results;

        if (isPageObjectResponse(results) && results?.length > 0) {
            const result: PageObjectResponse[] = results;
            return ok(result);
        } else {
            return ok([]);
        }
    } catch (error) {
        return handleNotionError(error);
    }
}

export const getBlogSlugs = async (blogClient: BlogClient): Promise<Result<string[], ErrorResult>> => {
    try {
        const url = `${BASE_URL}/databases/${blogClient.config.databaseId}/query`;
        const notion = blogClient.config.notionToken;

        if (!notion) {
            return err({ code: 400, message: "Invalid or missing notion secret" });
        }

        /* const database = await notion.databases.query({
            database_id: blogClient.config.databaseId,
            filter: {
                and: [
                    {
                        property: "Slug",
                        rich_text: {
                            is_not_empty: true
                        }
                    },
                    {
                        property: "Published",
                        checkbox: {
                            "equals": true
                        },
                    }
                ]
            },
            filter_properties: ["KxP%5C"]
        }); */

        const database = await api.post<{ object: "list", results: PageObjectResponse[] }>(url, blogClient, {
            filter: {
                and: [
                    {
                        property: "Slug",
                        rich_text: {
                            is_not_empty: true
                        }
                    },
                    {
                        property: "Published",
                        checkbox: {
                            "equals": true
                        },
                    }
                ]
            },
            filter_properties: ["KxP%5C"]
        });

        const results = database.data?.results;

        if (isPageObjectResponse(results) && results?.length > 0) {
            const result: PageObjectResponse[] = results;
            //@ts-ignore
            const slugs = result.map((page) => page.properties["Slug"].rich_text[0].plain_text);
            return ok(slugs);
        }

        return ok([]);
    } catch (error) {
        return handleNotionError(error);
    }
}

export const getPageBySlug = async (blogClient: BlogClient, slug: string): Promise<Result<PageObjectResponse[], ErrorResult>> => {
    try {
        const notion = blogClient.config.notionToken;

        if (!notion) {
            return err({ code: 400, message: "Invalid or missing notion secret" });
        }

        /* const res = await notion.databases.query({
            database_id: blogClient.config.databaseId,

            filter: {
                property: "Slug",
                rich_text: {
                    equals: slug
                }
            }
        }); */

        const url = `${BASE_URL}/databases/${blogClient.config.databaseId}/query`;
        const res = await api.post<{ object: "list", results: PageObjectResponse[] }>(url, blogClient, {
            "filter": {
                "property": "Slug",
                "rich_text": {
                    "equals": slug
                }
            }
        });

        let pages: PageObjectResponse[] = [];

        if (res.data) {
            for (const page of res.data.results) {
                if (!isFullPage(page)) {
                    continue;
                }

                pages.push(page);
            }

            return ok(pages);
        } else {
            return err({ code: 500, message: "Some error ocurred" });
        }

    } catch (error) {
        return handleNotionError(error);
    }
}

export const getBlocks = async (blogClient: BlogClient, blockId: string): Promise<Result<BlockObjectResponse[], ErrorResult>> => {
    if (!blogClient.config.notionToken) {
        return err({ code: 400, message: "Invalid or missing notion secret" });
    }

    /* const { results, has_more, next_cursor, type } = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 100,
    }); */

    let blocks: BlockObjectResponse[] = [];

    const results = await getAllBlocksRecursively(blogClient, blockId, blocks, undefined);

    if (results.isErr()) {
        return err({ code: 500, message: results.error.message });
    }

    if (results.value.length > 0) {
        return ok(results.value);
    } else if (results && results.value.length == 0) {
        return ok([]);
    } else {
        return err({ code: 500, message: "Unknown Error" })
    }
}

const getAllBlocksRecursively = async (blogClient: BlogClient, blockId: string, blocks: BlockObjectResponse[], nextCursor?: string): Promise<Result<BlockObjectResponse[], ErrorResult>> => {
    try {
        let url = `${BASE_URL}/blocks/${blockId}/children?page_size=100`;
        if (nextCursor) {
            url += `&start_cursor=${nextCursor}`;
        }
        const res = await api.get<ListBlockChildrenResponse>(url, blogClient);
        
        //console.log("url", url, "blocks", blocks.length, "has_more", res.data?.has_more, "next_cursor", res.data?.next_cursor);
        if (res.error) {
            return err({ code: 500, message: res.error });
        }

        if (res.data) {
            const { results, has_more, next_cursor } = res.data;

            for (const block of results) {
                if (!isFullBlock(block)) continue;
                blocks.push(block);
            }

            if (has_more && next_cursor) {
                await getAllBlocksRecursively(blogClient, blockId, blocks, next_cursor);
            }
        }

        //console.log("blocks", blocks.length, "has_more", has_more, "next_cursor", next_cursor);
        //console.log("Final blocks length", blocks.length);
        return ok(blocks);
    } catch (error) {
        return handleNotionError(error);
    }
}

const handleNotionError = (error: any) => {
    switch (error.code) {
        case "notionhq_client_request_timeout":
            return err({ code: 400, message: "Request could not be completed" });
        case "object_not_found":
            return err({ code: 500, message: "Database of page not found" });
        case "unauthorized":
            return err({ code: 401, message: "User not authorized" })
        default:
            return err({ code: 400, message: error ? Object.keys(error)?.length > 0 ? "" : "" : "Some error ocurred" });
    }
}


export const getNotionUser = async (blogClient: BlogClient, userId: string): Promise<Result<UserObjectResponse, ErrorResult>> => {
    try {
        if (!blogClient.config.notionToken) {
            return err({ code: 400, message: "Invalid or missing notion secret" });
        }

        const url = `${BASE_URL}/users/${userId}`;

        const response = await api.get<UserObjectResponse>(url, blogClient);

        if (response.error) {
            return err({ code: 500, message: response.error });
        }

        if (response.data) {
            return ok(response.data);
        }

        return err({ code: 500, message: "Some error ocurred" });
    } catch (error) {
        return handleNotionError(error);
    }
}

export const getFAQs = async (blogClent: BlogClient, id: string): Promise<Result<FAQ[], ErrorResult>> => {
    const response = await getBlocks(blogClent, id);

    if (response.isOk()) {

        const faqs: FAQ[] = response.value.map((row) => {
            if (row.type == "table_row") {
                if (row.table_row.cells?.[0]?.[0]?.plain_text == "Question") {
                    return {
                        question: null,
                        answer: null
                    }
                } else {
                    return {
                        question: row.table_row.cells?.[0]?.[0]?.plain_text,
                        answer: row.table_row.cells?.[1]?.map((r) => r.plain_text)?.join("")
                    }
                }
            } else {
                return {
                    question: null,
                    answer: null
                }
            }
        });

        return ok(faqs);
    } else if (response.isErr()) {
        return err(response.error);
    } else {
        return err({
            code: 500, message: "Unknown Error"
        });
    }
}

export type CustomBlockObjectResponse = BlockObjectResponse | { type: "grouped_numbered_list", items: NumberedListItemBlockObjectResponse[] };

export const groupNumberedListItems = (blocks: BlockObjectResponse[]) => {
    const result: CustomBlockObjectResponse[] = [];
    let currentGroup: NumberedListItemBlockObjectResponse[] = [];

    for (let index = 0; index < blocks.length; index++) {
        const block = blocks[index];
        const prevBlock = blocks[index - 1];
        const nextBlock = blocks[index + 1];

        if (block.type === 'numbered_list_item') {
            if ((!prevBlock || prevBlock?.type !== 'numbered_list_item') && nextBlock?.type === 'numbered_list_item') {
                // first item in the doc
                currentGroup.push(block);
            } else if (prevBlock.type === 'numbered_list_item' && nextBlock?.type === 'numbered_list_item') {
                // next && prev block are numbered list items
                currentGroup.push(block);
            } else if (prevBlock?.type === 'numbered_list_item' && nextBlock?.type !== 'numbered_list_item') {
                currentGroup.push(block);
                // last item in the list
                result.push({
                    type: 'grouped_numbered_list',
                    items: currentGroup
                });

                currentGroup = [];
            } else {
                // number_list_item but not preceded or succeeded by number_list_item
                result.push(block);
            }
        } else {
            result.push(block);
        }
    }

    return result;
}