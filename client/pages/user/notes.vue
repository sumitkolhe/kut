<template>
	<div>
		<v-row justify="center">
			<v-col cols="12" md="8" lg="6" xl="4" v-click-outside="onClickOutside">
				<v-card outlined class="mx-2" rounded="lg">
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
						<v-btn text @click="close()">Close</v-btn>
						<v-spacer></v-spacer>
						<v-btn text @click="createNote()">Create</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<all-notes />
		<edit-note />
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
					;(this as any).$notify.success('Note created sucessfully')
				})
				.catch((err: any) => {
					;(this as any).$notify.error(err.response.data.message)
				})
		},
	},
})
</script>

