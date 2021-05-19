<template>
	<v-row justify="center" class="mt-6">
		<v-col cols="12" lg="11" xl="10">
			<h2 class="font-weight-medium mt-4 mb-10 text-center">
				All shortened Links
			</h2>
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
