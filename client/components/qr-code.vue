<template>
	<div>
		<v-btn icon right top @click="generateQr">
			<v-fade-transition hide-on-leave>
				<v-icon
					:key="String(clicked)"
					color="#2196f3"
					v-text="clicked ? 'mdi-qrcode-plus' : 'mdi-qrcode-scan'"
				/>
			</v-fade-transition>
		</v-btn>

		<v-dialog v-model="show_dialog" overlay-color="black" max-width="250">
			<v-sheet rounded="lg" align-center color="white">
				<v-card-text class="text-center">
					<qrcode :value="target" :options="{ width: 200 }"></qrcode>
				</v-card-text>
			</v-sheet>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: {
		target: String,
	},

	data: () => ({
		clicked: false,
		show_dialog: false,
		wait: 1500,
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
}
</script>
