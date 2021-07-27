<template>
	<v-app>
		<nuxt />
		<SystemAlertNotification />
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	//middleware: 'redirect',

	data() {
		return {
			loading: true,
		}
	},

	created() {
		if (this.$auth.loggedIn) {
			this.$router.push('/user/dashboard')
		}
	},
})
</script>

<style scoped>
#app {
	overflow: hidden;
	font-family: 'Inter', sans-serif;
}
</style>