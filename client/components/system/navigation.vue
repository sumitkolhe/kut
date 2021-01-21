<template>
	<v-main>
		<v-app-bar
			:color="$vuetify.theme.themes[theme].background"
			:clipped-left="clipped_bar"
			app
			flat
			:height="height"
		>
			<v-btn @click="drawer = !drawer" icon v-show="mobile_mode">
				<svg-icon size="32" name="arrow_right" />
			</v-btn>
			<h2 v-show="mobile_mode" class="ml-2 font-weight-bold">{{ title }}</h2>

			<v-spacer />
			<theme-switch />
			<span v-show="!mobile_mode" class="mx-2"></span>
			<!-- <notification-menu v-if="!mobile_mode" /> -->
			<span class="mx-2"></span>
			<user-menu />
			<span v-show="!mobile_mode" class="mx-2"></span>
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
			:color="drawer_color"
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
										<svg-icon
											size="30"
											name="chevron_right"
											v-if="mini_variant"
										/>
										<svg-icon v-else size="30" name="chevron_left" />
									</v-btn>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-col>
				</v-row>
			</template>
			<template v-slot:append>
				<v-row class="ma-4" v-if="!mini_variant">
					<v-btn block depressed color="accent" @click="logout()">Logout</v-btn>
				</v-row>

				<v-row justify="center" class="pa-6 mb-0" v-show="mini_variant">
					<v-btn icon color="primary" @click="logout()">
						<svg-icon name="logout" size="40" />
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
			if ((this as any).$vuetify.breakpoint.width < 960) return 65
			return 80
		},
		mobile_mode() {
			if ((this as any).$vuetify.breakpoint.width < 960) return true
			return false
		},
		theme() {
			return this.$store.getters['theme/GET_THEME'] ? 'dark' : 'light'
		},

		drawer_color() {
			if ((this as any).$vuetify.theme.dark && this.mobile_mode)
				return 'rgba(0, 0, 0, 1)'
			else if (!(this as any).$vuetify.theme.dark && this.mobile_mode)
				return 'rgba(255, 255, 255,1)'
			else if ((this as any).$vuetify.theme.dark && !this.mobile_mode)
				return 'rgba(0, 0, 0, .6)'
			else return 'rgba(241, 241, 241,.8)'
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
					icon:
						'M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z',
					title: 'Dashboard',
					to: '/user/dashboard',
				},

				{
					icon:
						'M3 1C1.89 1 1 1.89 1 3V14C1 15.11 1.89 16 3 16H14C15.11 16 16 15.11 16 14V11H14V14H3V3H14V5H16V3C16 1.89 15.11 1 14 1M9 7C7.89 7 7 7.89 7 9V12H9V9H20V20H9V18H7V20C7 21.11 7.89 22 9 22H20C21.11 22 22 21.11 22 20V9C22 7.89 21.11 7 20 7H9',
					title: 'My Links',
					to: '/user/my-links',
				},
				{
					icon:
						'M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z',
					title: 'Statistics',
					to: '/user/statistics',
				},
				{
					icon:
						'M17,4V10L15,8L13,10V4H9V20H19V4H17M3,7V5H5V4C5,2.89 5.9,2 7,2H19C20.05,2 21,2.95 21,4V20C21,21.05 20.05,22 19,22H7C5.95,22 5,21.05 5,20V19H3V17H5V13H3V11H5V7H3M5,5V7H7V5H5M5,19H7V17H5V19M5,13H7V11H5V13Z',
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