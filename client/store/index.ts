import { GetterTree, ActionTree, MutationTree } from 'vuex'

export type RootState = ReturnType<typeof state>

export const state = () => ({
	notification: {
		visible: false,
		message: 'hello from store',
		color: '',
	},
})

export const getters: GetterTree<RootState, RootState> = {}

export const actions: ActionTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
	showNotification(state, payload) {
		state.notification.message = payload.notificationMessage
		state.notification.color = payload.notificationColor
	},
}
