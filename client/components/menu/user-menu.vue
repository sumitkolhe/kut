<template>
	<v-menu
		offset-y
		offset-x
		left
		bottom
		nudge-right="50"
		nudge-bottom="15"
		min-width="250px"
	>
		<template v-slot:activator="{ on }">
			<v-btn icon large v-on="on">
				<v-avatar color="accent" size="38">
					<span class="white--text headline">
						{{ user.initials }}
					</span>
				</v-avatar>
			</v-btn>
		</template>
		<v-card class="pa-4" rounded="lg">
			<v-list-item-content class="justify-center">
				<div class="mx-auto text-center">
					<v-avatar class="mt-n2 mb-3" size="38" color="accent">
						<span class="white--text headline">
							{{ user.initials }}
						</span>
					</v-avatar>
					<h3 class="text-capitalize">{{ this.$auth.user.user_name }}</h3>
					<p class="caption mt-1">
						{{ user.email }}
					</p>

					<v-row justify="center" class="mt-6">
						<v-btn to="settings" depressed rounded text>Settings</v-btn>
					</v-row>

					<v-row justify="center" class="mt-6">
						<v-btn @click="logout()" color="accent" depressed rounded text>
							Logout
						</v-btn>
					</v-row>
				</div>
			</v-list-item-content>
		</v-card>
	</v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { getInitials } from '../../utils/get-initials'
export default Vue.extend({
	data() {
		return {
			user: {
				initials: '',
				user_name: '',
				email: '',
			},
			profile_items: [
				{ title: 'Profile' },
				{ title: 'Settings' },
				{ title: 'Logout' },
			],
		}
	},

	mounted() {
		this.user.email = this.$auth?.user?.email as string
		this.user.user_name = this.$auth?.user?.user_name as string
		this.user.initials = getInitials(this.$auth?.user?.user_name as string)
	},

	methods: {
		async logout() {
			await this.$auth.logout()
			if ((this as any).$vuetify.theme.dark)
				(this as any).$vuetify.theme.dark = false
		},
	},
})
</script>

<style>
</style>