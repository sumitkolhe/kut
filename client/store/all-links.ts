import { MutationTree, GetterTree, ActionTree } from 'vuex'

export type RootState = ReturnType<typeof state>

export const state = () => ({
	links: [],
})

export const mutations: MutationTree<RootState> = {
	SET_ALL_LINKS: (state, links) => (state.links = links),
}

export const getters: GetterTree<RootState, RootState> = {
	getAllLinks: (state) => {
		return state.links
	},
}

export const actions: ActionTree<RootState, RootState> = {
	async fetchAllLinks({ commit }) {
		const res = await this.$axios.$get('/links')
		commit('SET_ALL_LINKS', res)
	},
}
