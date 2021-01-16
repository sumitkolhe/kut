import { link } from 'joi'
import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { RootState } from '~/store'
import { convertDate } from '~/utils/convert-date'

export type AllLinksState = ReturnType<typeof state>

export const state = () => ({
	all_links: Array(),
	recent_links: Array(),
	update_link: Object(),
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

	SET_UPDATE_LINK: (state, links) => {
		state.update_link = links
	},
	PUSH_RECENT_LINK: (state, recent_link) => {
		recent_link.created = convertDate(recent_link.created)
		state.recent_links.unshift(recent_link)
	},
	REMOVE_DELETED_LINK: (state, deleted_link) => {
		state.all_links = state.all_links.filter(function (obj) {
			return obj._id !== deleted_link
		})
	},
}

export const getters: GetterTree<AllLinksState, RootState> = {
	GET_ALL_LINKS: (state) => {
		return state.all_links
	},
	GET_RECENT_LINKS: (state) => {
		return state.recent_links
	},
	GET_UPDATE_LINK: (state) => {
		return state.update_link
	},
}

export const actions: ActionTree<AllLinksState, RootState> = {
	async fetchRecentLinks({ commit }, limit?: string) {
		const data = await this.$axios.$get(
			limit ? `/links/?limit=${limit}` : `/links`
		)
		commit('SET_RECENT_LINKS', data)
	},
	async fetchAllLinks({ commit }) {
		const data = await this.$axios.$get('/links')
		commit('SET_ALL_LINKS', data)
	},

	async deleteLink({ commit, dispatch }, link_id: string) {
		await this.$axios.$delete('/links', { data: { _id: link_id } })
		commit('REMOVE_DELETED_LINK', link_id)
		//dispatch('fetchAllLinks')
	},

	async updateLink({ commit }, payload: Object) {
		const data = await this.$axios.$patch('/links', payload)
		commit('SET_UPDATE_LINK', data)
	},
}
