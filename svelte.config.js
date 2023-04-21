import preprocess from 'svelte-preprocess';
//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true,
			preserve: ['ld+json']
		})
	],

	kit: {
		adapter: adapter({
			runtime: "edge"
		}),
		serviceWorker: {
			register: false
		}
	}
};

export default config;
