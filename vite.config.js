import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // Use root path for custom domain
  const base = '/'
  
  return {
    plugins: [
      react(),
      // Copy CNAME file to dist during build
      {
        name: 'copy-cname',
        writeBundle() {
          if (command === 'build') {
            copyFileSync(resolve('CNAME'), resolve('dist/CNAME'))
          }
        }
      }
    ],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      rollupOptions: {
        output: {
          // Add content-based hashes to all chunks and assets
          entryFileNames: '[name]-[hash].js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.')
            const extType = info[info.length - 1]
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `images/[name]-[hash][extname]`
            }
            if (/css/i.test(extType)) {
              return `css/[name]-[hash][extname]`
            }
            return `assets/[name]-[hash][extname]`
          },
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom']
          }
        }
      }
    },
    base
  }
})
