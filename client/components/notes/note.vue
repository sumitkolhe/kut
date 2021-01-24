<template>
	<v-card
		hover
		outlined
		rounded="lg"
		class="flex d-flex flex-column"
		@mouseenter="toggleEditIcon"
		@mouseleave="toggleEditIcon"
		@click="editNote()"
	>
		<v-card-title>
			{{ note.title }}
			<v-spacer></v-spacer>
			<v-btn icon :ripple="false">
				<svg-icon name="edit" v-show="showEditIcon" />
			</v-btn>
		</v-card-title>
		<v-card-text v-text="note.content"></v-card-text>
	</v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: {
		note: Object(),
	},
	data() {
		return {
			showEditIcon: false,
			showEdit: false,
		}
	},

	methods: {
		toggleEditIcon() {
			this.showEditIcon = !this.showEditIcon
		},

		editNote() {
			this.showEdit = true
			this.$store.commit('notes/SET_UPDATE_NOTE', this.note)
			this.$store.commit('notes/SET_SHOW_DIALOG', true)
		},
	},
})
</script>


<style scoped>
.v-card.v-sheet.theme--light {
	border: 2px solid rgba(0, 0, 0, 0.12) !important;
}
.v-card.v-sheet.theme--dark {
	border: 2px solid rgba(255, 255, 255, 0.12) !important;
}
</style>