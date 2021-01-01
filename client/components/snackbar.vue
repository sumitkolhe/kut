<template>
	<v-snackbar v-model="show" :color="color">
		{{ message }}
		<v-btn text @click="show = false">Close</v-btn>
	</v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data() {
		return {
			show: false,
			message: '',
			color: '',
		}
	},

	created() {
		this.$store.subscribe((mutation, state) => {
			if (mutation.type === 'snackbar/showNotification') {
				this.message = state.snackbar.notifcationMessage
				this.color = state.snackbar.notificationColor
				this.show = true
			}
		})
	},
})
</script>