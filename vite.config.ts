import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'Fractal Ads Platform',
        short_name: 'FractalAds',
        description: 'Децентрализованная платформа объявлений',
        theme_color: '#6366f1',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  define: {
    global: 'globalThis',
    process: {
      env: {}
    }
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'libp2p': ['libp2p'],
          'react-vendor': ['react', 'react-dom'],
          'crypto': ['@noble/ed25519']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['libp2p', '@libp2p/webrtc-star', '@libp2p/websockets', 'simple-peer']
  }
})