<template>
	<v-row justify="center">
		<v-col cols="12" sm="10" md="8" lg="6">
			<v-card class="pa-sm-8 pa-4 mb-4" rounded="lg">
				<v-row justify="start" class="mb-0">
					<v-col>
						<h1>Hey {{ this.$auth.user.user_name }},</h1>
					</v-col>
				</v-row>
				<v-divider class="mb-6"></v-divider>
				<v-row>
					<v-col>
						<h3 class="text--secondary mb-2">Change Password</h3>
						<p class="text--secondary">
							Enter a new password to change your current password.
						</p>
					</v-col>
				</v-row>
				<v-row justify="space-around">
					<v-col>
						<p class="font-weight-bold">New Password</p>
						<v-text-field
							disabled
							placeholder="WORK IN PROGRESS"
							v-model="payload.long_url"
							single-line
							outlined
						></v-text-field>
					</v-col>
				</v-row>
				<v-card-actions>
					<v-col align="center">
						<v-row justify="center">
							<v-btn
								depressed
								color="primary"
								dark
								class="font-weight-bold background--text"
							>
								Submit
							</v-btn>
						</v-row>
						<v-row justify="center" class="mt-12 mb-n4">
							<v-btn
								depressed
								outlined
								color="error"
								@click="show_advanced = !show_advanced"
							>
								Advanced Settings
							</v-btn>
						</v-row>
					</v-col>
				</v-card-actions>
				<v-row v-show="show_advanced" justify="space-around" class="mt-8">
					<v-col>
						<h2 class="font-weight-bold primary--text">Delete Account</h2>
						<v-divider class="mt-2 mb-6"></v-divider>
						<p class="text--secondary mb-6">
							Deleting your account would delete all the links and notes
							associated with it.
						</p>
						<v-btn depressed color="accent" @click="show_dialog = true">
							Delete Your Account
						</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
		<v-fade-transition hide-on-leave>
			<v-bottom-sheet v-model="show_dialog">
				<v-sheet class="text-center" height="180px">
					<div class="py-3">
						<p class="font-weight-bold mt-4 px-4">
							Do you really want to delete your account? This action cannot be
							undone.
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
							@click="deleteAccount()"
						>
							<svg-icon name="delete" />
							Delete
						</v-btn>
					</v-row>
				</v-sheet>
			</v-bottom-sheet>
		</v-fade-transition>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data: () => ({
		loading: false,
		show_dialog: false,
		show_advanced: false,
		wait: 1500,

		payload: {
			_id: '',
			long_url: '',
			alias: '',
			description: '',
		} as any,
	}),

	methods: {
		async deleteAccount() {
			const email = this.$auth?.user?.email as string
			await this.$axios.delete('/auth/delete', { data: { email } })
			this.$auth.logout()
		},
	},
})
</script>

<style>
</style>