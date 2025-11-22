import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    include: ['src/test/**/*.{test,spec}.{js,jsx}'],
    transformMode: {
      web: [/.[jt]sx$/],
    },
  },
})
