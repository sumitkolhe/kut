import { MutationTree, GetterTree, ActionTree } from 'vuex'

export type RootState = ReturnType<typeof state>

export const state = () => ({
	isThemeDark: false,
	renderKey: 0,
})

export const mutations: MutationTree<RootState> = {
	SET_THEME: (state) => {
		if (state.isThemeDark == false) {
			window.$nuxt.$root.$vuetify.theme.dark = true
			state.isThemeDark = true
			state.renderKey += 1
		} else if (state.isThemeDark == true) {
			window.$nuxt.$root.$vuetify.theme.dark = false
			state.isThemeDark = false
			state.renderKey += 1
		}
	},

	INIT_THEME: (state) => {
		if (state.isThemeDark == true) {
			window.$nuxt.$root.$vuetify.theme.dark = true
			state.isThemeDark = true
		}

		state.renderKey = 0
	},
}

export const getters: GetterTree<RootState, RootState> = {
	getTheme: (state) => {
		return state.isThemeDark
	},

	getRenderKey: (state) => {
		return state.renderKey
	},
}
