import { NuxtConfig } from '@nuxt/types/config'

const NuxtAppConfig: NuxtConfig = {
  target: 'static',

  head: {
    titleTemplate: '%s - A Modern URL shortener',
    title: 'Small',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900',
      },
    ],
  },

  css: [],
  plugins: [],
  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    ['@nuxtjs/vuetify', { css: false, treeShake: true }],
    '@nuxtjs/composition-api/module',
  ],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  router: {
    middleware: ['auth'],
  },

  axios: {
    baseURL: 'http://localhost:4000/api',
  },

  auth: {
    strategies: {
      local: {
        token: {
          prefix: 'accessToken.',
          property: 'accessToken',
          required: true,
          type: 'Bearer',
          global: true,
        },
        user: {
          property: '',
          autoFetch: true,
        },
        endpoints: {
          login: { url: 'auth/login', method: 'post' },
          register: { url: 'auth/register', method: 'post' },
          user: { url: 'user/me', method: 'get' },
          logout: false,
        },
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/dashboard',
    },
  },

  vuetify: {
    theme: {
      options: {},
      dark: true,
      default: false,
      disable: false,
      themes: {
        dark: {
          foreground: '#000',
          background: '#ffffff',
          'accents-1': '#fafafa',
          'accents-2': '#eaeaea',
          'accents-3': '#999999',
          'accents-4': ' #888888',
          'accents-5': '#666666',
          'accents-6': '#444444',
          'accents-7': '#333333',
          'accents-8': '#111111',

          success: '#0070f3',
          'success-light': '#3291FF',
          'success-dark': '#0366D6',

          error: '#E00',
          'error-light': '#FF1A1A',
          'error-dark': '#C00',

          warning: '#F5A623',
          'warning-light': '#F7B955',
          'warning-dark': '#F49B0B',

          alert: '#FF0080',
          purple: '#F81CE5',
          cyan: '#79FFE1',
          violet: '#7928CA',
        },
        light: {
          foreground: '#fff',
          background: '#000000',
          'accents-1': '#111111',
          'accents-2': '#333333',
          'accents-3': '#444444',
          'accents-4': '#666666',
          'accents-5': '#888888',
          'accents-6': '#999999',
          'accents-7': '#eaeaea',
          'accents-8': '#fafafa',

          success: '#0070f3',
          'success-light': '#3291FF',
          'success-dark': '#0366D6',

          error: '#E00',
          'error-light': '#FF1A1A',
          'error-dark': '#C00',

          warning: '#F5A623',
          'warning-light': '#F7B955',
          'warning-dark': '#F49B0B',

          alert: '#FF0080',
          purple: '#F81CE5',
          cyan: '#79FFE1',
          violet: '#7928CA',
        },
      },
    },
  },

  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    extend(config) {
      config.node = {
        fs: 'empty',
      }
    },
  },
}

export default NuxtAppConfig
