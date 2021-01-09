<template>
	<v-app dark>
		<client-only>
			<Particles
				color="#fff"
				:particles-number="50"
				shape-type="circle"
				:particle-size="3"
				movement-direction="none"
				lines-color="#fff"
				:line-linked="true"
				:move-speed="0.8"
			/>
		</client-only>
		<v-main class="pt-2 pt-sm-2 pt-xs-2 pt-md-0 pt-lg-0 pt-xl-0 background">
			<Navigation />
			<v-container>
				<alert-notification />
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
	font-family: 'Montserrat', sans-serif;
}

div[id^='particles-instance-'] {
	height: 100vh !important;
	width: 100vw !important;
	position: fixed !important;
	top: 0 !important;
	margin: 0 !important;
	padding: 0 !important;
	overflow: hidden !important;
	z-index: 0 !important;
}
</style>
