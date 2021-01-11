import { MutationTree, GetterTree, ActionTree } from 'vuex'

export type RootState = ReturnType<typeof state>

export const state = () => ({
	all_links: Array(),
	recent_links: Array(),
})

export const mutations: MutationTree<RootState> = {
	SET_ALL_LINKS: (state, links) => (state.all_links = links),
	SET_RECENT_LINKS: (state, links) => (state.recent_links = links),
	PUSH_RECENT_LINK: (state, links) => state.recent_links.unshift(links),
}

export const getters: GetterTree<RootState, RootState> = {
	GET_ALL_LINKS: (state) => {
		return state.all_links
	},
	GET_RECENT_LINKS: (state) => {
		return state.recent_links
	},
}

export const actions: ActionTree<RootState, RootState> = {
	async fetchRecentLinks({ commit }, limit?: string) {
		const data = await this.$axios.$get(
			limit ? `/links/?limit=${limit}` : `/links/`
		)
		commit('SET_RECENT_LINKS', data)
	},
	async fetchALLLinks({ commit }) {
		const data = await this.$axios.$get(' /links/')
		commit('SET_ALL_LINKS', data)
	},
}
