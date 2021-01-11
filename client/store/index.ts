import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
	error: Object(),
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
	GET_ERROR: (state) => {
		return state.error.response.data
	},
}

export const mutations: MutationTree<RootState> = {
	SET_ERROR: (state, error) => (state.error = error),
}

export const actions: ActionTree<RootState, RootState> = {}
