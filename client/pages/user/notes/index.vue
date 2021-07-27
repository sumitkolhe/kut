<template>
	<div>
		<v-row justify="center">
			<v-col cols="12" md="8" lg="8" xl="6" v-click-outside="onClickOutside">
				<v-card outlined class="mx-2 mt-8 round">
					<div class="pa-2">
						<v-text-field
							v-model="note.title"
							v-show="titleFieldVisible"
							label="Title"
							single-line
							flat
							solo
							background-color="transparent"
							maxlength="30"
							counter
						></v-text-field>
						<v-textarea
							v-model="note.content"
							@focus="showTitleFieldAndActions"
							:rows="2"
							auto-grow
							flat
							solo
							label="Take a note..."
							single-line
							maxlength="150"
							counter
							background-color="transparent"
						></v-textarea>
					</div>
					<v-card-actions v-show="actionsVisible">
						<v-btn color="error" text @click="close()">Close</v-btn>
						<v-spacer></v-spacer>
						<v-btn
							:disabled="(note.title && note.content) == ''"
							color="success"
							text
							@click="createNote()"
						>
							Create
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<NotesAllNotes />
		<NotesEditNote />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	data() {
		return {
			note: {
				title: '',
				content: '',
			},
			titleFieldVisible: false,
			actionsVisible: false,
		}
	},

	methods: {
		showTitleFieldAndActions() {
			this.titleFieldVisible = true
			this.actionsVisible = true
		},
		hideTitleFieldAndActions() {
			this.titleFieldVisible = false
			this.actionsVisible = false
		},
		onClickOutside() {
			this.close()
		},
		close() {
			this.hideTitleFieldAndActions()
		},

		async createNote() {
			await this.$store
				.dispatch('notes/createNote', this.note)
				.then(() => {
					this.note.title = ''
					this.note.content = ''
					;(this as any).$notify.success('Note created sucessfully')
				})
				.catch((err: any) => {
					;(this as any).$notify.error(err.response.data.message)
				})
		},
	},
})
</script>

<style  scoped>
.round {
	border-radius: 10px !important;
}

.v-card.v-sheet.theme--light {
	border: 2px solid rgba(0, 0, 0, 0.12) !important;
}
.v-card.v-sheet.theme--dark {
	border: 2px solid rgba(255, 255, 255, 0.12) !important;
}
</style>