import { MutationTree, GetterTree, ActionTree } from 'vuex'

export type RootState = ReturnType<typeof state>

export const state = () => ({
	shortened_link: '',
})

export const mutations: MutationTree<RootState> = {
	SET_SHORT_LINK: (state, link) => (state.shortened_link = link),
}

export const actions: ActionTree<RootState, RootState> = {
	async createShortLink({ commit }, payload) {
		const data = await this.$axios
			.$post('/shorten/', payload)
			.then(() => {
				;(this as any).$notify.success('Link shortened sucessfully')
			})
			.catch((err) => {
				;(this as any).$notify.error(err.response.data.message)
			})
		commit('SET_SHORT_LINK', data)
	},
}

export const getters: GetterTree<RootState, RootState> = {
	getShortLink: (state) => {
		return state.shortened_link
	},
}