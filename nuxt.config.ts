import { fileURLToPath } from 'url'
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Trym',
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'Trym' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },

  srcDir: 'src',

  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt', 'nuxt-icon'],

  serverMiddleware: [
    { path: '/api', handler: '~/server/server.ts' },
    { path: '/api/**', handler: '~/server/server.ts' },
  ],

  alias: {
    store: fileURLToPath(new URL('./src/store', import.meta.url)),
    composables: fileURLToPath(new URL('./src/composables', import.meta.url)),
    configs: fileURLToPath(new URL('./src/server/configs', import.meta.url)),
    controllers: fileURLToPath(new URL('./src/server/controllers', import.meta.url)),
    exceptions: fileURLToPath(new URL('./src/server/exceptions', import.meta.url)),
    helpers: fileURLToPath(new URL('./src/server/helpers', import.meta.url)),
    middlewares: fileURLToPath(new URL('./src/server/middlewares', import.meta.url)),
    interfaces: fileURLToPath(new URL('./src/server/interfaces', import.meta.url)),
    models: fileURLToPath(new URL('./src/server/models', import.meta.url)),
    routes: fileURLToPath(new URL('./src/server/routes', import.meta.url)),
    services: fileURLToPath(new URL('./src/server/services', import.meta.url)),
    utils: fileURLToPath(new URL('./src/server/utils', import.meta.url)),
  },

  runtimeConfig: {
    dbUrl: process.env.DB_URL,
    dbName: process.env.DB_NAME,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
  },

  nitro: {
    plugins: ['~/server/helpers/mongoose.helper.ts'],
  },
})
