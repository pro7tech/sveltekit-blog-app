import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}, 
	preprocess: vitePreprocess(),
	vitePlugin: {
		experimental: {
			inspector: {
				holdMode: true,
			}
		}
	}
};

export default config;
