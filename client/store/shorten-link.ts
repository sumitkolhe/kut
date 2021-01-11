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
	async createShortLink({ commit, rootState }, payload) {
		return this.$axios
			.$post('/shorten/', payload)
			.then((data: any) => {
				;(this as any).$notify.success('Link shortened sucessfully')
				commit('SET_SHORT_LINK', data)
			})
			.catch((err: any) => {
				commit('SET_ERROR', err, { root: true })
				//;(this as any).$notify.error(err.response.data.message)
			})
	},
}
