import { getBlocks, getDatabaseById } from '$lib/notion/api';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Page } from '$lib/types';

export const load = (async () => {
    try {
        const res = await getDatabaseById("4d9d69b33e68432c9b516354816eff09"); 
        if(res.isOk()){
            if(res.value?.length > 0){
                //console.log("res.value", JSON.stringify(res.value));
                return {
                    pages: res.value
                }
            }else{
                return {
                    error: {
                        code: 400,
                        message: "Please add rows in the database"
                    }
                }
            }
        }

        if(res.isErr()){
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
}) satisfies PageServerLoad;