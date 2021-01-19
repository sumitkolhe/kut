<template>
	<div>
		<v-btn class="mr-1" icon @click="showAnalytics()">
			<svg-icon name="analytics" />
		</v-btn>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import '@nuxtjs/auth-next'

export default Vue.extend({
	props: {
		target: String,
	},

	data: () => ({
		clicked: false,
		show_dialog: false,
		wait: 1500,
	}),

	methods: {
		async showAnalytics() {
			try {
				this.$router.push(`/user/analytics/${this.target}`)
			} catch (err) {}
		},
	},
})
</script>
