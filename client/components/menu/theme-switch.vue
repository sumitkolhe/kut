<template>
	<v-btn icon @click="changeTheme()">
		<svg-icon size="36" name="sun" />
	</v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	mounted() {
		this.$store.commit('theme/INIT_THEME')
	},
	methods: {
		changeTheme() {
			this.$store.commit('theme/SET_THEME')
		},
	},
})
</script>

<style>
</style>