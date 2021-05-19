<template>
	<v-app>
		<Particles />
		<v-main>
			<v-container>
				<nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'empty',
}
</script>

<style  scoped>
div[id^='particles-js'] {
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