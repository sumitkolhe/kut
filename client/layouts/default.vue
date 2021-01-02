<template>
	<v-app dark>
		<v-main class="pt-2 pt-sm-2 pt-xs-2 pt-md-0 pt-lg-0 pt-xl-0 background">
			<Navigation />
			<v-container>
				<Notification />
				<nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>


<script lang="ts">
import Vue from 'vue'
import '@nuxtjs/auth-next'
export default Vue.extend({
	middleware: 'auth',
})
</script>

<style>
#app {
	font-family: 'Poppins', sans-serif;
}
</style>
