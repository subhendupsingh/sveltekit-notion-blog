import { getBlocks, getFAQs, getPageBySlug } from '$lib/notion/api';
import type { PageServerLoad } from './$types';
import { isFullUser } from '@notionhq/client';

export const load = (async ({ params }) => {
    const { slug } = params;
    const response = await getPageBySlug("4d9d69b33e68432c9b516354816eff09", slug);
    
    if(response.isOk() && response.value?.length>0){
        const page = response.value?.[0];
        const title = page.properties["Title"].type=="title" && page.properties["Title"]?.title?.[0]?.type=="text" ? page.properties["Title"]?.title?.[0]?.text?.content : undefined;
        const description = page.properties["Short Description"]?.type=="rich_text"? page.properties["Short Description"]?.rich_text?.[0]?.plain_text : undefined;
        const cover = page?.cover?.type=="external" ? page?.cover?.external?.url : undefined;
        const published = page.properties["Publish Date"]?.type == "date" ? page.properties["Publish Date"].date?.start: undefined;
        const author = page.properties["Authors"]?.type=="people" && page.properties["Authors"]?.people?.[0] ? isFullUser(page.properties["Authors"]?.people?.[0])? page.properties["Authors"]?.people?.[0] : undefined: undefined;
        //console.log("published", published);
        
        if(!page?.id){
            return {
                error: {
                    code: 500,
                    message: "Invalid or missing page!"
                }
            }
        }

        const blockResponse = await getBlocks(page.id);
        
        if(blockResponse.isOk()){
            //console.log("result", JSON.stringify(blockResponse.value));
            const blocks = blockResponse.value;
            const faqsTableId =  blocks?.filter((f) => f.type=="table")?.[0]?.id;
            let faqs = null;
            
            if(faqsTableId){
                const faqsResponse =  await getFAQs(faqsTableId);
                
                if(faqsResponse.isOk()){
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
                faqs
            }
        }

        if(blockResponse.isErr()){
            return {
                error: {
                    code: blockResponse.error.code,
                    message: blockResponse.error.message
                }
            }
        }
    }else{
        return {
            error: {
                code: 500,
                message: "Some error ocurred"
            }
        }
    }
    
    if(response.isErr()){
        return {
            error: {
                code: response.error.code,
                message: response.error.message
            }
        }
    }
}) satisfies PageServerLoad;

   