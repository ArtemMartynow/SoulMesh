import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [ /\.[tj]sx?$/ ],
      imports: [
        {
          '@/composables/useAxios.js': ['http']
        }
      ],
      dirs: ['./src/stores'],
      defaultExportByFilename: false
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})