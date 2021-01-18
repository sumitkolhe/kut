<template>
	<v-row justify="center" class="mt-6">
		<v-col cols="12" lg="11" xl="10">
			<p class="font-weight-medium text-h5 mb-10">All shortened Links</p>
			<all-links-table />
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data() {
		return {}
	},

	methods: {},
})
</script>

<style scoped>
</style>
