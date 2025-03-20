import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    VitePWA({
      injectRegister: 'script',
      registerType: 'autoUpdate',
      strategies: 'generateSW', // Required to use a custom SW
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Task Timer',
        short_name: 'TTimer',
        description: 'A Vue 3 Progressive Web App to track your task progression.',
        theme_color: '#7092BE',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/");
            },
            handler: "NetworkFirst" as const,
            options: {
              cacheName: "staticAssetsCache"
            }
          },
          {
            urlPattern: ({ url }) => {
              return url.pathname.endsWith(".woff2")
            },
            handler: "NetworkFirst" as const,
            options: {
              cacheName: "httpsAssetsCache"
            }
          }
        ]
      }
    })
  ],
  build: {
    assetsInlineLimit: 0 // Disable inlining
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
