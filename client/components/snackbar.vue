<template>
	<div class="text-center ma-2">
		<v-snackbar v-model="showNotification" :color="color">
			{{ message }}

			<template v-slot:action="{ attrs }">
				<v-btn
					color="black"
					text
					v-bind="attrs"
					@click="showNotification = false"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showNotification: false,
			message: '',
			color: '',
		}
	},

	created() {
		this.$store.subscribe((mutation, state) => {
			if (mutation.type === 'notification/showNotification') {
				this.message = state.notification.message
				this.color = state.notification.color
				this.showNotification = true
			}
		})
	},
}
</script>