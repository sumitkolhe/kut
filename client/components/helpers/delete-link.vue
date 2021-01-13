<template>
	<v-btn icon right top @click="openSheet()">
		<v-icon color="#ff0054">mdi-delete</v-icon>
		<v-fade-transition hide-on-leave>
			<v-bottom-sheet v-model="show_dialog">
				<v-sheet class="text-center" height="200px">
					<div class="py-3">
						<p class="font-weight-bold mt-4">
							Do you really want to delete this link?
						</p>
					</div>
					<v-row justify="center">
						<v-btn
							depressed
							class="mt-6 mr-4"
							color="secondary"
							@click="show_dialog = !show_dialog"
						>
							Cancel
						</v-btn>
						<v-btn
							depressed
							class="mt-6 ml-4"
							color="primary"
							@click="deleteLink(target)"
						>
							<v-icon left>mdi-delete</v-icon>
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
		clicked: false,
		show_dialog: false,
		wait: 1500,
	}),

	methods: {
		openSheet() {
			this.show_dialog = true
		},

		deleteLink(target: any) {
			console.log(target)
		},
	},
})
</script>
