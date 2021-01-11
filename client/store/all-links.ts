import { MutationTree, GetterTree, ActionTree } from 'vuex'

export type RootState = ReturnType<typeof state>

export const state = () => ({
	all_links: [],
})

export const mutations: MutationTree<RootState> = {
	SET_ALL_LINKS: (state, links) => (state.all_links = links),
}

export const getters: GetterTree<RootState, RootState> = {
	GET_ALL_LINKS: (state) => {
		return state.all_links
	},
}

export const actions: ActionTree<RootState, RootState> = {
	async fetchAllLinks({ commit }, limit?: string) {
		const data = await this.$axios.$get(
			limit ? `/links/?limit=${limit}` : `/links/`
		)
		commit('SET_ALL_LINKS', data)
	},
}
