import { MutationTree, GetterTree } from 'vuex'

export type RootState = ReturnType<typeof state>

export const state = () => ({
	themeVariant: 'light',
})

export const mutations: MutationTree<RootState> = {
	changeTheme(state) {
		state.themeVariant =
			(localStorage.getItem('themeVariant') as string) || 'light'
		if (state.themeVariant == 'light') {
			state.themeVariant = 'dark'
			window.$nuxt.$root.$vuetify.theme.dark = true
		} else if (state.themeVariant == 'dark') {
			state.themeVariant = 'light'
			window.$nuxt.$root.$vuetify.theme.dark = false
		}
		localStorage.setItem('themeVariant', state.themeVariant)
	},
}

export const getters: GetterTree<RootState, RootState> = {
	getTheme: (state) => {
		return (
			(localStorage.getItem('themeVariant') as string) ||
			state.themeVariant
		)
	},
}
