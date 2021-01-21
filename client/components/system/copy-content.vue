<template>
	<v-btn class="mr-1" icon @click="copy">
		<v-fade-transition hide-on-leave>
			<svg-icon
				v-if="clicked"
				:key="String(clicked)"
				color="green"
				name="check"
			/>
			<svg-icon v-else :key="String(clicked)" color="green" name="copy" />
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
			console.log('yes')
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
