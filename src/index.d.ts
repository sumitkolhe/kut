/* eslint-disable @typescript-eslint/no-unused-vars */
// workaround for https://github.com/nuxt-modules/icon/pull/63
import * as _nuxt_schema from '@nuxt/schema'

interface NuxtIconModuleOptions {
  size?: string | false
  class?: string
  aliases?: { [alias: string]: string }
}

declare module '@nuxt/schema' {
  interface AppConfig {
    nuxtIcon?: NuxtIconModuleOptions
  }
}
