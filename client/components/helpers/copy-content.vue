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


<script lang="ts">
import Vue from 'vue'
import '@nuxtjs/auth-next'

export default Vue.extend({
	props: {
		target: String,
	},

	data: () => ({
		clicked: false,
		wait: 1500,
	}),

	methods: {
		async copy() {
			try {
				this.clicked = true
				await (this as any).$copyText(this.target)

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
