import { MutationTree, GetterTree, ActionTree } from 'vuex'

export type RootState = ReturnType<typeof state>

export const state = () => ({
	shortened_link: '',
})

export const mutations: MutationTree<RootState> = {
	SET_SHORT_LINK: (state, link) => (state.shortened_link = link),
}

export const getters: GetterTree<RootState, RootState> = {
	GET_SHORT_LINK: (state) => {
		return state.shortened_link
	},
}
export const actions: ActionTree<RootState, RootState> = {
	async createShortLink({ commit }, payload) {
		await this.$axios
			.$post('/shorten/', payload)
			.then((data: any) => {
				;(this as any).$notify.success('Link shortened sucessfully')
				commit('SET_SHORT_LINK', data)
			})
			.catch((err: any) => {
				;(this as any).$notify.error(err.response.data.message)
			})
	},
}
