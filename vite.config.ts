import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
const mockServe = () => viteMockServe({
  mockPath: 'mock',
  localEnabled: true,
  prodEnabled: false,
  supportTs: true,
  watchFiles: true
})
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    mockServe()
  ],
  server: {
    open: true
  }
})
