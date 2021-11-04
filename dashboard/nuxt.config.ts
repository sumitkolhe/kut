import { NuxtConfig } from '@nuxt/types/config'

const NuxtAppConfig: NuxtConfig = {
  target: 'static',

  head: {
    title: 'Trym',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'A free URL shortening service ',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },

      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900',
      },
    ],
  },

  css: ['./assets/global.css', '@geist-ui/vue/dist/geist-ui.css'],

  plugins: ['~plugins/theme'],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],

  axios: {},
  server: {
    port: '3000',
    host: '0.0.0.0',
  },

  build: { transpile: ['@geist-ui/vue'] },
}

export default NuxtAppConfig
