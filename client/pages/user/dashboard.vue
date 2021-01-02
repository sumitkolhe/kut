<template>
	<v-row justify="center" align="center">
		<v-btn @click="snackTime">Test snack</v-btn>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	methods: {
		snackTime() {
			this.$store.commit('notification/showNotification', {
				message: 'hello',
				color: 'accent',
			})
		},
	},
})
</script>
