// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		starlight({
			title: 'Fab4m.org',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/fab4m-forms' }],
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
	vite: {
		optimizeDeps: {
			include: ['react', 'react-dom', 'react-dom/client'],
		},
	},
});
