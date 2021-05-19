import { MutationTree } from 'vuex'

export type NotificationState = ReturnType<typeof state>

export const state = () => ({
	message: '',
	color: '',
})

export const mutations: MutationTree<NotificationState> = {
	showNotification(state, payload) {
		state.message = payload.message
		state.color = payload.color
	},
}
