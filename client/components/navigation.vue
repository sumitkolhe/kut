<template>
	<v-main>
		<v-app-bar
			:clipped-left="clippedbar"
			app
			elevation="0"
			height="80"
			color="background"
		>
			<!--<v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->

			<v-spacer />

			<v-btn @click="$vuetify.theme.dark = !$vuetify.theme.dark">Theme</v-btn>

			<v-menu offset-y offset-x left rounded="lg">
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						class="mr-8"
						icon
						color="accent"
						text
						dark
						v-bind="attrs"
						v-on="on"
					>
						<v-icon large>mdi-bell-outline</v-icon>
					</v-btn>
				</template>
				<v-list nav>
					<v-list-item link v-for="(item, i) in notificationItems" :key="i">
						<v-list-item-title v-text="item.title" />
					</v-list-item>
				</v-list>
			</v-menu>

			<v-menu offset-y bottom nudge-bottom="10" rounded="lg">
				<template v-slot:activator="{ on, attrs }">
					<v-avatar
						class="mr-8"
						v-bind="attrs"
						v-on="on"
						color="primary"
						size="36"
					>
						<v-icon dark>mdi-account-circle</v-icon>
					</v-avatar>
				</template>
				<v-list nav>
					<v-list-item link v-for="(item, i) in profileItems" :key="i">
						<v-list-item-title v-text="item.title" />
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>

		<v-navigation-drawer
			permanent
			v-model="drawer"
			:mini-variant="miniVariant"
			mini-variant-width="100"
			width="260"
			:clipped="clipped"
			fixed
			app
		>
			<v-list nav>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:to="item.to"
					router
					exact
				>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<template v-slot:prepend>
				<v-row class="py-4">
					<v-fade-transition>
						<v-col v-if="!miniVariant">
							<v-list-item>
								<v-list-item-content>
									<v-list-item-title class="text-h4 font-weight-bold">
										{{ title }}
									</v-list-item-title>
									<v-list-item-subtitle>v{{ version }}</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-col>
					</v-fade-transition>

					<v-col align="center">
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title class="title">
									<v-btn icon @click.stop="miniVariant = !miniVariant">
										<v-icon x-large>mdi-menu</v-icon>
									</v-btn>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-col>
				</v-row>
			</template>
			<template v-slot:append>
				<div class="pa-2">
					<v-btn block elevation="0" @click="logout()">Logout</v-btn>
				</div>
			</template>
		</v-navigation-drawer>
	</v-main>
</template>


<script lang="ts">
import Vue from 'vue'
import '@nuxtjs/auth-next'
export default Vue.extend({
	data() {
		return {
			on: '',
			attrs: '',
			clipped: false,
			drawer: false,
			clippedbar: false,
			fixed: false,
			miniVariant: false,
			title: process.env.APP_NAME,
			version: process.env.APP_VERSION,
			notificationItems: [
				{ title: 'Profile' },
				{ title: 'Settings' },
				{ title: 'Logout' },
			],
			profileItems: [
				{ title: 'Profile' },
				{ title: 'Settings' },
				{ title: 'Logout' },
			],
			items: [
				{
					icon: 'mdi-view-dashboard-outline',
					title: 'Dashboard',
					to: '/user/dashboard',
				},

				{
					icon: 'mdi-link',
					title: 'My Links',
					to: '/user/links',
				},
				{
					icon: 'mdi-chart-bell-curve-cumulative',
					title: 'Analytics',
					to: '/user/analytics',
				},
				{
					icon: 'mdi-notebook-outline',
					title: 'Notes',
					to: '/user/notes',
				},
			],
		}
	},

	methods: {
		async logout() {
			await this.$auth.logout()
		},
	},
})
</script>

<style>
.v-list {
	padding: 4px 16px !important;
}

.v-list-item {
	min-height: 60px !important;
	border-radius: 12px !important;
}

.v-list--nav .v-list-item::before {
	border-radius: 12px;
}
</style> 
