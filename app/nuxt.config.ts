import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  ssr: false,

  target: 'static',

  head: {
    titleTemplate: '%s | Shorten your links easily',
    title: 'Reduced',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  //loading: { color: '#f55555' },

  css: [],

  env: {},

  plugins: [],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  axios: {
    baseURL: 'http://localhost:80/',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Bearer',
        },
        endpoints: {
          login: { url: 'api/auth/login', method: 'post' },
          logout: { url: 'api/auth/logout', method: 'post' },
          register: { url: 'api/auth/register', method: 'post' },
        },
      },
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
          primary: '#F55555',
          accent: '#424242',
          secondary: '#26C6DA',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252',
        },
        light: {
          primary: '#F55555',
          accent: '#212121',
          secondary: '#26C6DA',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#F44336',
        },
      },
    },
  },

  build: {
    extend: function (config, { isDev, isClient }) {
      config.node = {
        fs: 'empty',
      }
    },
  },
}

export default config
