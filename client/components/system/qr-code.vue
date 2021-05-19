<template>
	<v-btn class="mr-1" icon @click="generateQr">
		<v-fade-transition hide-on-leave>
			<svg-icon :key="String(clicked)" color="#00bbf9" name="qr" />
		</v-fade-transition>
		<v-dialog v-model="show_dialog" overlay-color="black" max-width="250">
			<v-sheet rounded="lg" align-center color="white">
				<v-card-text class="text-center">
					<qrcode :value="target" :options="{ width: 200 }"></qrcode>
				</v-card-text>
			</v-sheet>
		</v-dialog>
	</v-btn>
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
		wait: 1000,
	}),

	methods: {
		async generateQr() {
			try {
				this.clicked = true
				this.show_dialog = true

				setTimeout(() => {
					this.clicked = false
				}, this.wait)
			} catch (e) {
				console.error(e)
			}
		},
	},
})
</script>
