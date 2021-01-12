<template>
	<v-btn icon right top @click="copy">
		<v-fade-transition hide-on-leave>
			<v-icon
				:key="String(clicked)"
				color="green"
				v-text="clicked ? 'mdi-check' : 'mdi-content-copy'"
			/>
		</v-fade-transition>
	</v-btn>
</template>

<script>
export default {
	props: {
		target: {
			type: String,
			required: true,
		},
	},

	data: () => ({
		clicked: false,
		wait: 1500,
	}),

	methods: {
		async copy() {
			try {
				this.clicked = true
				await this.$copyText(this.target)

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
