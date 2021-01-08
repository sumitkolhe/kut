declare module 'vuex/types/index' {
	// this.$myInjectedFunction inside Vuex stores
	interface Store<S> {
		$myInjectedFunction(message: string): void
	}
}

export default ({ store }, inject: any) => {
	inject('notify', {
		success(message: string) {
			store.commit('notification/showNotification', {
				message: message,
				color: 'success',
			})
		},
		error(message: string) {
			store.commit('notification/showNotification', {
				message: message,
				color: 'error',
			})
		},
		info(message: string) {
			store.commit('notification/showNotification', {
				message: message,
				color: 'info',
			})
		},
	})
}
