import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

export type ShortenLinkState = ReturnType<typeof state>

export const state = () => ({
	shortened_link: '',
})

export const mutations: MutationTree<ShortenLinkState> = {
	SET_SHORT_LINK: (state, link) => (state.shortened_link = link),
}

export const getters: GetterTree<ShortenLinkState, RootState> = {
	GET_SHORT_LINK: (state) => {
		return state.shortened_link
	},
}
export const actions: ActionTree<ShortenLinkState, RootState> = {
	async createShortLink({ commit }, payload) {
		return this.$axios.$post('/shorten', payload)
	},
}
