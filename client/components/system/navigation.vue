<template>
	<v-main>
		<v-app-bar
			:color="$vuetify.theme.themes[theme].background"
			:clipped-left="clipped_bar"
			app
			flat
			:height="height"
		>
			<v-btn @click="drawer = !drawer" icon v-show="mobileMode">
				<v-icon large>mdi-arrow-right-circle</v-icon>
			</v-btn>
			<h2 v-show="mobileMode">{{ title }}</h2>

			<v-spacer />
			<theme-switch class="mx-md-4" />
			<notification-menu class="mx-md-4" />
			<user-menu class="mx-md-4" />
		</v-app-bar>

		<v-navigation-drawer
			v-model="drawer"
			:permanent="$vuetify.breakpoint.mdAndUp"
			:mini-variant="mini_variant"
			mini-variant-width="100"
			width="260"
			:clipped="clipped"
			fixed
			app
			:color="
				$vuetify.theme.dark ? `rgba(0, 0, 0, .8)` : `rgba(255, 255, 255,1)`
			"
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
						<v-list-item-title class="nav-links" v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<template v-slot:prepend>
				<v-row class="py-4">
					<v-fade-transition>
						<v-col v-if="!mini_variant">
							<v-list-item>
								<v-list-item-content>
									<p class="app-title">
										{{ title }}
									</p>
									<v-list-item-subtitle>v{{ version }}</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-col>
					</v-fade-transition>

					<v-col align="center">
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>
									<v-btn icon @click.stop="mini_variant = !mini_variant">
										<v-icon x-large>
											{{
												mini_variant
													? 'mdi-chevron-right-circle'
													: 'mdi-chevron-left-circle'
											}}
										</v-icon>
									</v-btn>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-col>
				</v-row>
			</template>
			<template v-slot:append>
				<v-row class="ma-4" v-if="!mini_variant">
					<v-btn block color="primary" depressed @click="logout()">
						Logout
					</v-btn>
				</v-row>

				<v-row justify="center" class="pa-6 mb-0" v-show="mini_variant">
					<v-btn icon color="primary" @click="logout()">
						<v-icon x-large>mdi-logout-variant</v-icon>
					</v-btn>
				</v-row>
			</template>
		</v-navigation-drawer>
	</v-main>
</template>


<script lang="ts">
import Vue from 'vue'
import '@nuxtjs/auth-next'

export default Vue.extend({
	computed: {
		height() {
			if (this.$vuetify.breakpoint.xs) return 65
			else return 80
		},
		mobileMode() {
			if (this.$vuetify.breakpoint.xs) return true
			else return false
		},
		theme() {
			return this.$store.getters['theme/GET_THEME'] ? 'dark' : 'light'
		},
	},
	data() {
		return {
			on: '',
			attrs: '',
			clipped: false,
			permanent: true,
			drawer: false,
			clipped_bar: false,
			fixed: false,
			mini_variant: false,
			title: process.env.APP_NAME,
			version: process.env.APP_VERSION,

			items: [
				{
					icon: 'mdi-view-dashboard-outline',
					title: 'Dashboard',
					to: '/user/dashboard',
				},

				{
					icon: 'mdi-link',
					title: 'My Links',
					to: '/user/my-links',
				},
				{
					icon: 'mdi-chart-line',
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

<style  scoped>
.app-title {
	font-size: 28px;
	font-weight: 700;
}

.nav-links {
	font-weight: 600;
}

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