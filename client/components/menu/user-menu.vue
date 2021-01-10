<template>
	<v-menu offset-y bottom nudge-bottom="10" rounded="lg">
		<template v-slot:activator="{ on, attrs }">
			<v-avatar class="mr-8" v-bind="attrs" v-on="on" size="36">
				<v-icon large>mdi-account-circle</v-icon>
			</v-avatar>
		</template>
		<v-list nav>
			<v-list-item link v-for="(item, i) in profile_items" :key="i">
				<v-list-item-title v-text="item.title" />
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data() {
		return {
			profile_items: [
				{ title: 'Profile' },
				{ title: 'Settings' },
				{ title: 'Logout' },
			],
		}
	},
})
</script>

<style>
</style>