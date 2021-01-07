export default ({ app, store }, inject) => {
	inject('notify', {
		showNotification() {
			store.commit('notification/showNotification', {
				message: 'hello',
				color: 'accent',
			})
		},
	})
}
