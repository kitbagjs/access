import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: '@kitbag/access',
      fileName: 'kitbag-access',
    },
  },
  plugins: [dts({ rollupTypes: true })],
})
