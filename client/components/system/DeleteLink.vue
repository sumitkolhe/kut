<template>
	<v-btn class="mr-1" icon @click="openSheet()">
		<SystemSvgIcon name="delete" color="#ff0054" />
		<v-fade-transition hide-on-leave>
			<v-bottom-sheet v-model="show_dialog">
				<v-sheet class="text-center" height="180px">
					<div class="py-3">
						<p class="font-weight-bold mt-4">
							Do you really want to delete this link?
						</p>
					</div>
					<v-row justify="center">
						<v-btn
							depressed
							class="mt-6 mr-4"
							@click="show_dialog = !show_dialog"
						>
							Cancel
						</v-btn>
						<v-btn
							depressed
							class="mt-6 ml-4"
							color="accent"
							:loading="loading"
							@click="deleteLink(target)"
						>
							<SystemSvgIcon name="delete" />
							Delete
						</v-btn>
					</v-row>
				</v-sheet>
			</v-bottom-sheet>
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
		loading: false,
		show_dialog: false,
		wait: 1500,
	}),

	methods: {
		openSheet() {
			this.show_dialog = true
		},

		async deleteLink(target: any) {
			await this.$store
				.dispatch('all-links/deleteLink', target)
				.then(() => {
					this.loading = false
					this.show_dialog = false
					;(this as any).$notify.success('Link deleted sucessfully')
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
