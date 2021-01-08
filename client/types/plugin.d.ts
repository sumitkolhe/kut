import Vue from 'vue'

declare module 'vue/types/vue' {
	interface Vue {
		$notification: (message: string) => void
	}
}

declare module 'vuex/types/index' {
	interface Store<S> {
		$notify(message: string): void
	}
}
