import Vue from 'vue'
import { Framework } from 'vuetify'
import { Context, Middleware } from '@nuxt/types'

declare module '*.vue' {
	import Vue from 'vue'
	export default Vue
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
