import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

export type ThemeState = ReturnType<typeof state>

export const state = () => ({
	isThemeDark: false,
	renderKey: 0,
})

export const mutations: MutationTree<ThemeState> = {
	SET_THEME: (state) => {
		window.$nuxt.$root.$vuetify.theme.dark = !state.isThemeDark
		state.isThemeDark = !state.isThemeDark
		localStorage.setItem('isThemeDark', JSON.stringify(state.isThemeDark))
		state.renderKey += 1
	},

	INIT_THEME: (state) => {
		state.isThemeDark =
			JSON.parse(localStorage.getItem('isThemeDark')!) || false
		window.$nuxt.$root.$vuetify.theme.dark = state.isThemeDark
		state.renderKey = 0
	},
}

export const getters: GetterTree<ThemeState, RootState> = {
	GET_THEME: (state) => {
		return state.isThemeDark
	},

	GET_RENDER_KEY: (state) => {
		return state.renderKey
	},
}
