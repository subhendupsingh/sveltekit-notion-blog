import { BYPASS_TOKEN } from '$env/static/private';
import { getBlogPageBySlug } from '$lib';

export const config = {
    isr: {
        expiration: 60,
        bypassToken: BYPASS_TOKEN
    }
};

export const load = (event) => getBlogPageBySlug(event);

   