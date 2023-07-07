import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Kut - A modern link management tool',
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'Kut - A modern link management tool' },
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
    pageTransition: {
      name: 'fade-in',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'fade-in',
      mode: 'out-in',
    },
  },

  srcDir: 'src',

  css: ['~/assets/toast.css'],

  ui: {
    icons: ['tabler'],
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/devtools',
    '@nuxthq/ui',
  ],

  serverHandlers: [
    { route: '/api', handler: '~/server/server.ts' },
    { route: '/api/**', handler: '~/server/server.ts' },
  ],

  nitro: {
    plugins: ['~/server/common/helpers/mongo.helper.ts'],
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    },
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
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      githubClientId: process.env.GITHUB_CLIENT_ID,
    },
    dbUrl: process.env.DB_URL,
    dbName: process.env.DB_NAME,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
    accountVerificationTokenSecret: process.env.ACCOUNT_VERIFICATION_TOKEN_SECRET,
    accountVerificationTokenExpiration: process.env.ACCOUNT_VERIFICATION_TOKEN_EXPIRATION,
    emailApiKey: process.env.SIB_EMAIL_API_KEY,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
})
