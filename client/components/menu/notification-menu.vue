<template>
	<v-menu offset-y offset-x left rounded="lg">
		<template v-slot:activator="{ on, attrs }">
			<v-btn icon text v-bind="attrs" v-on="on">
				<svg-icon name="bell" size="32" />
			</v-btn>
		</template>
		<v-list>
			<v-list-item link v-for="(item, i) in notification_items" :key="i">
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
			notification_items: [
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