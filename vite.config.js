import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://technomantraindia-lang.github.io/cathodpower/
const pagesBase = '/cathodpower/'
const isGitHubPages =
  process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true'

/**
 * Prefix absolute /images, /fonts, /video… URLs with the Vite base path so
 * public assets resolve under /cathodpower/ on GitHub Pages.
 */
function prefixPublicAssets(base) {
  if (!base || base === '/') return null

  const prefix = base.endsWith('/') ? base.slice(0, -1) : base
  const pathGroup =
    '(?:images|fonts|video|datasheets|models|favicon\\.png|NEW%20PRODUCT%20IMAGES|NEW PRODUCT IMAGES)'
  const quoted = new RegExp(`([\`'"=(])/(${pathGroup})`, 'g')
  const cssUrl = new RegExp(`url\\(\\s*/(${pathGroup})`, 'g')

  return {
    name: 'prefix-public-assets',
    transform(code, id) {
      if (id.includes('node_modules')) return null
      if (!/\.(css|jsx|js|tsx|ts)$/.test(id)) return null

      const next = code
        .replace(cssUrl, `url(${prefix}/$1`)
        .replace(quoted, `$1${prefix}/$2`)

      return next === code ? null : next
    },
  }
}

export default defineConfig({
  // Local `npm run dev` stays at `/`; production / GH Pages use the repo subpath.
  base: isGitHubPages ? pagesBase : '/',

  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    prefixPublicAssets(isGitHubPages ? pagesBase : '/'),
  ],

  server: {
    watch: {
      ignored: [
        '**/*.mp4',
        '**/*.webm',
        '**/*.m4v',
        '**/*.pdf',
        '**/video/**',
        '**/public/video/**',
        '**/public/NEW PRODUCT IMAGES/**',
        '**/*.zip',
      ],
    },
  },

  // Pre-bundle only deps we actually import (faster dev cold start)
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'gsap',
      'gsap/ScrollTrigger',
      '@studio-freight/lenis',
    ],
  },

  build: {
    target: 'es2020',
    // Smaller output; can enable `true` if you need to debug production
    sourcemap: false,

    // Modern browsers: omit legacy module preload polyfill (~small HTML/JS win)
    modulePreload: { polyfill: false },

    // Inline assets smaller than 4 kb (icons, tiny images) as base64
    assetsInlineLimit: 4096,

    // Skip gzip size reporting — measurably speeds up production builds
    reportCompressedSize: false,

    // Strip all console.* calls in production
    minify: 'esbuild',
    esbuild: {
      drop: ['console', 'debugger'],
    },

    rollupOptions: {
      output: {
        // Deterministic hashed filenames for long-term caching with sanitized URL-safe names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name ? assetInfo.name.split('.').pop() : 'media';
          const baseName = assetInfo.name
            ? assetInfo.name
                .replace(/\.[^/.]+$/, '')
                .replace(/[^a-zA-Z0-9_-]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')
            : 'asset';
          return `assets/${extType}/${baseName}-[hash][extname]`;
        },

        manualChunks(id) {
          // Core React runtime — tiny, always needed
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'vendor-react';
          }
          // GSAP + ScrollTrigger together (used on most pages)
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }
          // Lenis smooth scroll
          if (id.includes('node_modules/@studio-freight/lenis')) {
            return 'vendor-lenis';
          }
          // Framer Motion (animation pages only)
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          // Three.js ecosystem (heavy — split out so other pages don't pay the cost)
          if (id.includes('node_modules/three') ||
              id.includes('node_modules/@react-three/fiber') ||
              id.includes('node_modules/@react-three/drei')) {
            return 'vendor-three';
          }
          // Swiper
          if (id.includes('node_modules/swiper')) {
            return 'vendor-swiper';
          }
        },
      },
    },
  },
})
