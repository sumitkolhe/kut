<template>
	<v-row v-if="all_notes.length > 0" class="mx-1 mt-12" justify="center">
		<v-col
			v-for="(note, idx) in all_notes"
			:key="idx"
			cols="12"
			sm="6"
			md="4"
			lg="4"
			xl="3"
			class="d-flex flex-column"
		>
			<note :note="note" />
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	computed: {
		all_notes() {
			return this.$store.getters['notes/GET_ALL_NOTES']
		},
	},

	async mounted() {
		await this.$store.dispatch('notes/fetchAllNotes')
	},
})
</script>

<style>
</style>