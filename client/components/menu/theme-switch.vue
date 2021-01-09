<template>
	<v-btn class="mr-4" icon @click="changeTheme()">
		<v-icon large>mdi-white-balance-sunny</v-icon>
	</v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	mounted() {
		this.$store.getters['theme/getTheme'] == 'dark'
			? (this.$vuetify.theme.dark = true)
			: (this.$vuetify.theme.dark = false)
	},
	methods: {
		changeTheme() {
			this.$store.commit('theme/changeTheme')

			//this.$vuetify.theme.dark = this.$store.getters['theme/getTheme']
		},
	},
})
</script>

<style>
</style>