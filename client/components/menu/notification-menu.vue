<template>
	<v-menu offset-y offset-x left rounded="lg">
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				class="mr-6"
				icon
				color="secondary"
				text
				dark
				v-bind="attrs"
				v-on="on"
			>
				<v-icon large>mdi-bell-outline</v-icon>
			</v-btn>
		</template>
		<v-list>
			<v-list-item link v-for="(item, i) in notificationItems" :key="i">
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
			notificationItems: [
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