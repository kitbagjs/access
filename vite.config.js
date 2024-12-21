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
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'access',
      fileName: 'access',
      formats: ['cjs', 'es', 'iife', 'umd'],
    },
  },
  plugins: [dts()],
})
