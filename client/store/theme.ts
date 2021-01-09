import Vue from 'vue'
import { MutationTree, GetterTree } from 'vuex'

export type RootState = ReturnType<typeof state>

export const state = () => ({
	isDarkTheme: false,
})

export const mutations: MutationTree<RootState> = {
	changeTheme(state, payload) {
		Vue.prototype.$vuetify.theme.dark = true
		//localStorage.setItem('isDarkTheme', state.isDarkTheme as any)
	},
}

export const getters: GetterTree<RootState, RootState> = {
	isDarkTheme: (state) => {
		return state.isDarkTheme
	},
}
