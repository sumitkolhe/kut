<template>
	<v-dialog v-model="dialog" persistent max-width="500">
		<v-card>
			<div class="pa-2">
				<v-text-field
					label="Title"
					single-line
					flat
					solo
					maxlength="30"
					counter
					:value="selected_note.title"
					@input="payload.title = $event"
					background-color="transparent"
				></v-text-field>
				<v-textarea
					auto-grow
					flat
					solo
					label="Take a note..."
					single-line
					maxlength="100"
					counter
					:value="selected_note.content"
					@input="payload.content = $event"
					background-color="transparent"
				></v-textarea>
			</div>
			<v-card-actions>
				<v-btn @click="deleteNote()" icon>
					<v-icon color="red">mdi-delete</v-icon>
				</v-btn>

				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="closeDialog()">Close</v-btn>
				<v-btn text color="green" @click="updateNote()">Update</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data() {
		return {
			payload: {} as any,
		}
	},

	computed: {
		dialog() {
			return this.$store.getters['notes/GET_SHOW_DIALOG']
		},
		selected_note() {
			return this.$store.getters['notes/GET_UPDATE_NOTE']
		},
	},

	mounted() {
		let data = this.$store.getters['notes/GET_UPDATE_NOTE']

		for (let prop in data) {
			this.payload[prop] = data[prop]
		}
	},

	methods: {
		closeDialog() {
			this.$store.commit('notes/SET_SHOW_DIALOG', false)
		},

		async updateNote() {
			this.payload._id = this.selected_note._id
			await this.$store
				.dispatch('notes/updateNote', this.payload)
				.then(() => {
					this.$store.commit('notes/SET_SHOW_DIALOG', false)
					;(this as any).$notify.success('Note updated sucessfully')
				})
				.catch((err: any) => {
					;(this as any).$notify.error(err.response.data.message)
				})
		},
		async deleteNote() {
			await this.$store
				.dispatch('notes/deleteNote', this.selected_note._id)
				.then(() => {
					this.$store.commit('notes/SET_SHOW_DIALOG', false)
					;(this as any).$notify.success('Note deleted sucessfully')
				})
				.catch((err: any) => {
					;(this as any).$notify.error(err.response.data.message)
				})
		},
	},
})
</script>