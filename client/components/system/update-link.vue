<template>
	<v-col>
		<v-row justify="space-around" class="pt-8">
			<v-col cols="12" md="4">
				<p class="font-weight-bold">Original Link</p>
				<v-text-field
					v-model="payload.long_url"
					single-line
					outlined
				></v-text-field>
			</v-col>
			<v-col cols="12" md="4">
				<p class="font-weight-bold">Custom Alias</p>
				<v-text-field
					v-model="payload.alias"
					single-line
					outlined
				></v-text-field>
			</v-col>
			<v-col cols="12" md="4">
				<p class="font-weight-bold">Description</p>
				<v-text-field
					v-model="payload.description"
					single-line
					outlined
				></v-text-field>
			</v-col>
		</v-row>
		<v-row justify="center" class="mb-8">
			<v-btn
				@click="updateLink(payload)"
				depressed
				color="primary"
				:loading="loading"
			>
				Update link
			</v-btn>
		</v-row>
	</v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import '@nuxtjs/auth-next'

export default Vue.extend({
	props: {
		target: Object,
	},

	data: () => ({
		loading: false,
		show_dialog: false,
		wait: 1500,

		payload: {
			_id: '',
			long_url: '',
			alias: '',
			description: '',
		} as any,
	}),

	created() {
		this.$store.commit('all-links/SET_UPDATE_LINK', this.target)

		let data = this.$store.getters['all-links/GET_UPDATE_LINK']

		for (let prop in data) {
			if (this.payload.hasOwnProperty(prop)) {
				this.payload[prop] = data[prop]
			}
		}
	},

	methods: {
		async updateLink(payload: Object) {
			await this.$store
				.dispatch('all-links/updateLink', payload)
				.then(() => {
					this.loading = false
					;(this as any).$notify.success('Link updated sucessfully')
					this.$emit('callback')
				})
				.catch((err: any) => {
					this.loading = false
					;(this as any).$notify.error(err.response.data.message)
				})
		},
	},
})
</script>
