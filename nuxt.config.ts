import { fileURLToPath } from 'url'
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  app: {
    head: {
      title: '',
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { hid: 'og:title', name: 'og:title', content: '' },
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

  modules: ['@nuxtjs-alt/auth', '@nuxtjs-alt/http', '@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt', 'nuxt-icon'],

  serverMiddleware: [
    { path: '/api', handler: '~/server/server.ts' },
    { path: '/api/**', handler: '~/server/server.ts' },
  ],

  alias: {
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

  auth: {
    globalMiddleware: true,
    strategies: {
      local: {
        scheme: 'refresh',
        enabled: true,
        name: '',
        token: {
          property: 'data.accessToken',
          required: true,
          type: 'Bearer',
          global: true,
        },
        refreshToken: {
          property: 'data.refreshToken',
          data: 'refreshToken',
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: '',
        },
        endpoints: {
          user: { url: '/api/auth/me', method: 'get' },
          login: { url: '/api/auth/login', method: 'post' },
          refresh: { url: '/api/auth/refresh-token', method: 'post' },
          logout: false,
        },
      },
    },

    redirect: {
      callback: '/auth/login',
      login: '/auth/login',
      logout: '/auth/login',
      home: '/',
    },
  },
})
