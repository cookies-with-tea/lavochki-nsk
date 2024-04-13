import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const svgIconsConfig = createSvgIconsPlugin({
  iconDirs: [path.resolve(process.cwd(), 'src/app/assets/icons')],
  symbolId: 'icon-[dir]-[name]',
  inject: 'body-first',
  customDomId: '__svg__icons__dom__',
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') as ImportMetaEnv

  return {
    plugins: [
      react({
        babel: { babelrc: true },
      }),
      svgIconsConfig,
    ],
    server: {
      host: '0.0.0.0',
      port: 4173,
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
              @use "app/styles/additionals/variables/index.scss" as *;
              @use "app/styles/additionals/mixins/index.scss" as *;
            `,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@@': fileURLToPath(new URL('./', import.meta.url)),
        public: fileURLToPath(new URL('./public', import.meta.url)),
        app: fileURLToPath(new URL('./src/app', import.meta.url)),
        '#processes': fileURLToPath(new URL('./src/processes', import.meta.url)),
        '#pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '#widgets': fileURLToPath(new URL('./src/widgets', import.meta.url)),
        '#features': fileURLToPath(new URL('./src/features', import.meta.url)),
        '#entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
        '#shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      },
    },
  }
})
