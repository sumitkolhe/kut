import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

export type AnalyticsState = ReturnType<typeof state>

export const state = () => ({
	analytics: Object(),
})

export const mutations: MutationTree<AnalyticsState> = {
	SET_ANALYTICS: (state, data) => {
		state.analytics = data
	},
}

export const getters: GetterTree<AnalyticsState, RootState> = {
	GET_ANALYTICS: (state) => {
		return state.analytics
	},
}

export const actions: ActionTree<AnalyticsState, RootState> = {
	async fetchAnalytics({ commit }, payload: Object) {
		const data = await this.$axios.$post('/analytics', payload)
		commit('SET_ANALYTICS', data)
	},
}
