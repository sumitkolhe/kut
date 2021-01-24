export default ({ store }: any, inject: any) => {
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
