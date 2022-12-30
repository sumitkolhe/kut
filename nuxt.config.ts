import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Kut',
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'Kut' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },

  srcDir: 'src',

  css: ['~/assets/toast.css'],

  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt', 'nuxt-icon'],

  serverHandlers: [
    { route: '/api', handler: '~/server/server.ts' },
    { route: '/api/**', handler: '~/server/server.ts' },
  ],

  nitro: {
    plugins: ['~/server/helpers/mongoose.helper.ts'],
  },

  build: {
    transpile: ['@headlessui/vue', 'vue-tiny-validate'],
  },

  alias: {
    components: fileURLToPath(new URL('./src/components', import.meta.url)),
    composables: fileURLToPath(new URL('./src/composables', import.meta.url)),
    interfaces: fileURLToPath(new URL('./src/interfaces', import.meta.url)),
    services: fileURLToPath(new URL('./src/services', import.meta.url)),
    store: fileURLToPath(new URL('./src/store', import.meta.url)),
    utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
    server: fileURLToPath(new URL('./src/server', import.meta.url)),
  },

  runtimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
    dbUrl: process.env.DB_URL,
    dbName: process.env.DB_NAME,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
    accountVerificationTokenSecret: process.env.ACCOUNT_VERIFICATION_TOKEN_SECRET,
    accountVerificationTokenExpiration: process.env.ACCOUNT_VERIFICATION_TOKEN_EXPIRATION,
    emailApiKey: process.env.SIB_EMAIL_API_KEY,
  },
})
