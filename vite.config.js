import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const page = f => fileURLToPath(new URL(f, import.meta.url))

// ponytail: port pinned to 5500 so the existing tab/bookmarks keep working
export default defineConfig({
  plugins: [react()],
  server: { port: 5500, strictPort: true },
  // multi-page build: one entry per html file, no router dependency needed
  build: { rollupOptions: { input: {
    main: page('./index.html'),
    about: page('./about.html'),
    privacy: page('./privacy.html'),
    terms: page('./terms.html'),
    contact: page('./contact.html'),
    events: page('./events.html'),
  } } },
})
