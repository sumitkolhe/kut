import Vue from 'vue'

declare module 'vue/types/vue' {
	interface Vue {
		$myInjectedFunction(message: string): void
	}
}

Vue.prototype.$myInjectedFunction = (message: string) => console.log(message)
