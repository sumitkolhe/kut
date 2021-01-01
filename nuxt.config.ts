import { NuxtConfig } from '@nuxt/types/config'
import { config } from './server/config/config'

const NuxtAppConfig: NuxtConfig = {
  telemetry: false,
  target: 'static',

  head: {
    titleTemplate: '%s | Shorten your links easily',
    title: 'Reduced',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
      },
    ],
  },

  loading: { color: '#f55555' },

  publicRuntimeConfig: {
    axios: {
      baseURL: `http://localhost:${config.SERVER_PORT}`, // server
      browserBaseURL: '/', // client / browser
    },
  },

  srcDir: 'client/',

  buildDir: './dist/.nuxt',

  generate: {
    dir: './dist/.nuxt',
  },

  components: true,

  server: {
    port: config.SERVER_PORT,
    host: config.SERVER_HOST,
  },

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  auth: {
    cookie: false,
    strategies: {
      local: {
        token: {
          property: 'accessToken',
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'userDetails',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          register: { url: '/api/auth/register', method: 'post' },
          user: { url: '/api/auth/me', method: 'get' },
        },
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/user/dashboard',
    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {},
      dark: false,
      default: false,
      disable: false,
      themes: {
        dark: {
          primary: '#f1f1f1',
          accent: '#ff5050',
          secondary: '#2b2d42',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252',
        },
        light: {
          primary: '#1e1e1e',
          accent: '#ff5050',
          secondary: '#2b2d42',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252',
        },
      },
    },
  },
  build: {
    extractCSS: true,
    extend: function (NuxtAppConfig) {
      NuxtAppConfig.node = {
        fs: 'empty',
        worker_threads: 'empty',
      }
    },
  },
}

export default NuxtAppConfig
