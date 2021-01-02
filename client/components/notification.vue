<template>
	<div class="text-center">
		<v-snackbar
			v-model="showNotification"
			:color="color"
			class="mb-4"
			timeout="1500"
		>
			{{ message }}

			<template v-slot:action="{ attrs }">
				<v-btn
					color="white"
					text
					icon
					v-bind="attrs"
					@click="showNotification = false"
				>
					<v-icon text>mdi-close-circle</v-icon>
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
})
</script>