import { getBlogPageBySlug } from '$lib';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const config = {
    isr: {
        expiration: 60,
    }
};

export const load = (event: ServerLoadEvent) => getBlogPageBySlug(event);

   