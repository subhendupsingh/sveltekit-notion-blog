import { NOTION_TOKEN } from "$env/static/private";
import type { FAQ } from "$lib/types";
import { Client, APIErrorCode, type NotionClientError, isNotionClientError, ClientErrorCode, isFullPage, isFullBlock } from "@notionhq/client";
import type { BlockObjectResponse, PageObjectResponse, PartialPageObjectResponse, UserObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { ok, err, Result } from 'neverthrow';

type ErrorResult = { code: number, message: string };

// Initializing a client
export const notion = new Client({
  auth: NOTION_TOKEN,
});

export const getDatabaseById = async (databaseId: string): Promise<Result<(PageObjectResponse)[], ErrorResult>> => {
    try {
        const database = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "Published",
                checkbox: {
                    "equals": true
                }
            }
        });

        const results = database.results;
        //console.log("results", results);
        
        if(isPageObjectResponse(results) && results?.length > 0){
            const result : PageObjectResponse[] = results;
            return ok(result);
        }else{
            return ok([]);
        }
    } catch (error) {
        return handleNotionError(error);
    }
}

export const getPageBySlug = async (databaseId: string, slug: string): Promise<Result<PageObjectResponse[], ErrorResult>> =>{
    try {
        const res = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "Slug",
                rich_text: {
                    equals: slug
                }
            }
        });

        let pages: PageObjectResponse[] = [];

        if(res){
            for (const page of res.results) {
                if (!isFullPage(page)) {
                  continue;
                }
                
                pages.push(page);
              }

              return ok(pages);
        }else{
            return err({ code: 500, message: "Some error ocurred"});
        }
    
    } catch (error) {
        return handleNotionError(error);
    }
}

export const getBlocks = async (blockId: string): Promise<Result<BlockObjectResponse[], ErrorResult>> => {
    const { results } = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 50,
    });

    let blocks: BlockObjectResponse[] = [];

    if(results && results.length > 0){
        for(const block of results){
            if(!isFullBlock(block)) continue;
            blocks.push(block);
        }
        return ok(blocks);
    }else if(results && results.length == 0){
        return ok([]);
    }else{
        return err({code: 500, message: "Unknown Error" })
    }
}

const handleNotionError = (error: unknown) => {
    if (isNotionClientError(error)) {
        // error is now strongly typed to NotionClientError
        switch (error.code) {
          case ClientErrorCode.RequestTimeout:
            return err({code: 400, message: "Request could not be completed"});
          case APIErrorCode.ObjectNotFound:
            return err({code: 500, message: "Database of page not found"});
          case APIErrorCode.Unauthorized:
            return err({code: 401, message: "User not authorized"})
          default:
            return err({code: 500, message: "Some error ocurred"})
        }
      }else{
        return err({code: 400, message: error ? Object.keys(error)?.length > 0 ?  "": "" : "Some error ocurred"});
      }
}

function isPageObjectResponse(response: any) : response is PageObjectResponse[] {
    return (response as PageObjectResponse[])?.[0]?.properties!==null && (response as PageObjectResponse[])?.[0]?.properties!==undefined;
}

export const getNotionUser = async (userId: string): Promise<Result<UserObjectResponse, ErrorResult>> => {
    try {
        const response = await notion.users.retrieve({user_id: userId});
        if(response){
            return ok(response)
        }else{
            return err({code: 500, message: "Some error ocurred"});
        }
    } catch (error) {
        return handleNotionError(error);
    }
}

export const getFAQs = async (id: string): Promise<Result<FAQ[], ErrorResult>> => {
    const response = await getBlocks(id);

    if(response.isOk()){
        const faqs: FAQ[] = response.value.map((row)=>{
            if(row.type=="table_row"){
                return {
                    question: row.table_row.cells?.[0]?.[0]?.plain_text,
                    answer: row.table_row.cells?.[1]?.[0]?.plain_text
                }
            }else{
                return {
                    question: null,
                    answer: null
                }
            }
        });

        return ok(faqs);
    }else if(response.isErr()){
        return err(response.error);
    }else{
        return err({
             code: 500, message: "Unknown Error"
        });
    }
}