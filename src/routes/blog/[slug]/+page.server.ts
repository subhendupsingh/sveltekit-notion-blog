import { getBlogPageBySlug } from '$lib';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = (event: ServerLoadEvent) => getBlogPageBySlug(event);