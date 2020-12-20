import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  ssr: false,

  target: 'static',

  head: {
    titleTemplate: '%s - app',
    title: 'app',
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

  modules: ['@nuxtjs/axios'],

  axios: {
    //baseURL: 'http://localhost:80/',
    common: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    },
    delete: {},
    get: {},
    head: {},
    post: {},
    put: {},
    patch: {},
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

  build: {},
}

export default config
