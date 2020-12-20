import colors from 'vuetify/es5/util/colors'
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

  loading: { color: '#f55555' },

  css: [],

  env: {},

  plugins: [],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios'],

  axios: {},

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {},
      dark: true,
      default: false,
      disable: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {},
}

export default config
