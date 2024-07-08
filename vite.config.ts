import { defineConfig } from 'vite';

import { mapHTMLFiles } from './map-html-files';

export default defineConfig({
	build: {
		rollupOptions: {
			input: mapHTMLFiles(),
		},
	},
});

