import { getBlocks } from '$lib/notion/api';
import type { FAQ } from '$lib/types';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const response = await getBlocks("94438b26-e0f4-4a15-a93f-6791e3d7e433");

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

        return json({
            faqs
        });
    }else if(response.isErr()){
        return json({
            error: { code: 500, message: response.error }
        });
    }else{
        return json({
            error: { code: 500, message: "Unknown Error"}
        });
    }
};