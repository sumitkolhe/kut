<template>
	<div class="text-center">
		<v-snackbar
			v-model="show_notification"
			:color="color"
			class="mb-4"
			timeout="2000"
		>
			<h3>{{ message }}</h3>

			<template v-slot:action="{ attrs }">
				<v-btn
					color="white"
					text
					icon
					v-bind="attrs"
					@click="show_notification = false"
				>
					<svg-icon name="close" />
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data() {
		return {
			show_notification: false,
			message: '',
			color: '',
		}
	},

	created() {
		this.$store.subscribe((mutation, state) => {
			if (mutation.type === 'notification/showNotification') {
				this.message = state.notification.message
				this.color = state.notification.color
				this.show_notification = true
			}
		})
	},
})
</script>