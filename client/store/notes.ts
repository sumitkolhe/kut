import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { RootState } from '~/store'
import { convertDate } from '~/utils/convert-date'

export type AllLinksState = ReturnType<typeof state>

export const state = () => ({
	all_notes: Array(),
	update_note: Object(),
	show_dialog: false,
})

export const mutations: MutationTree<AllLinksState> = {
	SET_ALL_NOTES: (state, notes) => {
		state.all_notes = notes
	},
	SET_UPDATE_NOTE: (state, note) => {
		state.update_note = note
	},
	SET_SHOW_DIALOG: (state, value) => {
		state.show_dialog = value
	},
}

export const getters: GetterTree<AllLinksState, RootState> = {
	GET_ALL_NOTES: (state) => {
		return state.all_notes
	},
	GET_UPDATE_NOTE: (state) => {
		return state.update_note
	},
	GET_SHOW_DIALOG: (state) => {
		return state.show_dialog
	},
}

export const actions: ActionTree<AllLinksState, RootState> = {
	async createNote({ commit }, payload) {
		const data = await this.$axios.$post('/notes', payload)
		commit('SET_ALL_NOTES', data)
	},

	async fetchAllNotes({ commit }) {
		const data = await this.$axios.$get('/notes')
		commit('SET_ALL_NOTES', data)
	},

	async deleteNote({ dispatch }, link_id: string) {
		await this.$axios.$delete('/note', { data: { _id: link_id } })
		dispatch('fetchAllNotes')
	},

	async updateNote({ commit }, payload: Object) {
		const data = await this.$axios.$patch('/note', payload)
		commit('SET_UPDATE_NOTE', data)
	},
}
