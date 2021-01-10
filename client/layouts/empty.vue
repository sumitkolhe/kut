<template>
	<v-app>
		<client-only>
			<Particles />
		</client-only>
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
</style>