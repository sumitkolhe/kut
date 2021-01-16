<template>
	<v-row class="mx-1 mt-12" justify="center">
		<v-col
			v-for="(note, idx) in all_notes"
			:key="idx"
			cols="12"
			sm="6"
			md="4"
			lg="4"
			xl="2"
			class="d-flex flex-column"
		>
			<note :note="note" />
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data() {
		return {
			all_notes: {},
		}
	},

	async mounted() {
		await this.$store.dispatch('notes/fetchAllNotes')
		this.all_notes = this.$store.getters['notes/GET_ALL_NOTES']
	},
})
</script>

<style>
</style>