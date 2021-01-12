import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { RootState } from '~/store'
import { convertDate } from '~/utils/convert-date'

export type AllLinksState = ReturnType<typeof state>

export const state = () => ({
	all_links: Array(),
	recent_links: Array(),
})

export const mutations: MutationTree<AllLinksState> = {
	SET_ALL_LINKS: (state, links) => {
		state.all_links = links
		state.all_links.forEach((item) => {
			item.created = convertDate(item.created)
		})
	},
	SET_RECENT_LINKS: (state, links) => {
		state.recent_links = links
		state.recent_links.forEach((item) => {
			item.created = convertDate(item.created)
		})
	},
	PUSH_RECENT_LINK: (state, recent_link) => {
		recent_link.created = convertDate(recent_link.created)
		state.recent_links.unshift(recent_link)
	},
}

export const getters: GetterTree<AllLinksState, RootState> = {
	GET_ALL_LINKS: (state) => {
		return state.all_links
	},
	GET_RECENT_LINKS: (state) => {
		return state.recent_links
	},
}

export const actions: ActionTree<AllLinksState, RootState> = {
	async fetchRecentLinks({ commit }, limit?: string) {
		const data = await this.$axios.$get(
			limit ? `/links/?limit=${limit}` : `/links/`
		)
		commit('SET_RECENT_LINKS', data)
	},
	async fetchAllLinks({ commit }) {
		const data = await this.$axios.$get('/links/')
		commit('SET_ALL_LINKS', data)
	},
}
