/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'

import { Context, Middleware } from '@nuxt/types'
import { Framework } from 'vuetify'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {}
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    fetch?(ctx: Context): Promise<void> | void
    layout?: string | ((ctx: Context) => string)
    middleware?: Middleware | Middleware[]
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $vuetify: Framework
  }
}
