import Vue from 'vue'
import { MutationTree, GetterTree } from 'vuex'

export type RootState = ReturnType<typeof state>

export const state = () => ({
	isThemeDark: false,
})

export const mutations: MutationTree<RootState> = {
	changeTheme(state) {
		state.isThemeDark = localStorage.getItem('isThemeDark') as any

		localStorage.setItem('isThemeDark', state.isThemeDark.toString())
	},
}

export const getters: GetterTree<RootState, RootState> = {
	getTheme: (state) => {
		return state.isThemeDark
	},
}
