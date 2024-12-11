import type { BlockObjectResponse, DatabaseObjectResponse, PageObjectResponse, PartialBlockObjectResponse, PartialDatabaseObjectResponse, PartialPageObjectResponse, PartialUserObjectResponse, UserObjectResponse } from ".";

export function isFullBlock(
    response:
        | PageObjectResponse
        | PartialPageObjectResponse
        | DatabaseObjectResponse
        | PartialDatabaseObjectResponse
        | BlockObjectResponse
        | PartialBlockObjectResponse
): response is BlockObjectResponse {
    return response.object === "block" && "type" in response
}

export function isPageObjectResponse(response: any): response is PageObjectResponse[] {
    return (response as PageObjectResponse[])?.[0]?.properties !== null && (response as PageObjectResponse[])?.[0]?.properties !== undefined;
}

export function isFullPage(page: any): page is PageObjectResponse {
    return page?.properties !== null && page?.properties !== undefined;
}

export function isObject(o: unknown): o is Record<PropertyKey, unknown> {
    return typeof o === "object" && o !== null
}

export function isFullUser(
    response: UserObjectResponse | PartialUserObjectResponse
): response is UserObjectResponse {
    return "type" in response
}