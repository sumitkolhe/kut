import { MutationTree } from 'vuex'

export type RootState = ReturnType<typeof state>

export const state = () => ({
	message: '',
	color: '',
	position: '',
})

export const mutations: MutationTree<RootState> = {
	showNotification(state, payload) {
		state.message = payload.message
		state.color = payload.color
		state.position = payload.position
	},
}
