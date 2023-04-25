import { getAllPosts } from '$lib';

export const config = {
    isr: {
        expiration: false,
        bypassToken: undefined
    }
};

export const load = () => getAllPosts();