// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    integrations: [
        react(),
        svelte(),
        starlight({
            title: 'Fab4m.org',
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/fab4m-forms' }],
            customCss: ['./src/styles/global.css'],
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

      plugins: [tailwindcss()],
    },
});
