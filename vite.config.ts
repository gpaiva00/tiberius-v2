/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginBundleObfuscator()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
