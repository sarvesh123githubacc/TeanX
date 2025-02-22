import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
          { src: 'public/manifest.json', dest: '.' }, 
          // { src: 'public/icons/*', dest: 'icons' }
          { src: 'src/content.js', dest: '.' },
          { src: 'src/background.js', dest: '.' },
      ],
    }),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
        content: './src/content.js',
        background: './src/background.js'
      }
    },
  },
});