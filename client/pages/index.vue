<template>
	<v-main :style="{ background: '#121212' }">
		<v-app-bar class="pt-2" elevation="0" height="100" color="primary">
			<v-spacer class="hidden-sm-and-down"></v-spacer>

			<img class="mb-6" src="~/assets/banner/banner-light.svg" />

			<v-spacer></v-spacer>

			<v-btn
				depressed
				color="rgba(0,0,0,0.1)"
				large
				class="mx-2 font-weight-bold hidden-sm-and-down"
				to="auth/login"
			>
				Login
			</v-btn>
			<v-btn
				depressed
				color="rgba(0,0,0,0.1)"
				class="mx-2 font-weight-bold hidden-sm-and-down"
				large
				to="auth/register"
			>
				Register
			</v-btn>

			<v-app-bar-nav-icon
				x-large
				class="hidden-md-and-up"
				@click.stop="drawer = !drawer"
			/>

			<v-spacer class="hidden-sm-and-down"></v-spacer>
		</v-app-bar>

		<v-navigation-drawer
			disable-resize-watcher
			v-model="drawer"
			width="260"
			fixed
			app
			color="#121212"
		>
			<v-list dark nav>
				<v-list-item router exact>Register</v-list-item>
				<v-list-item router exact>Login</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-row justify="center" class="pt-12 primary">
			<v-col align="center">
				<v-row justify="center" class="mt-sm-12 mt-sm-0">
					<p class="main-title px-6">Shorten your links quickly</p>
				</v-row>
				<v-row justify="center" class="mt-4">
					<p class="sub-title px-6">
						An Open-Source URL shortener built with powerful tools to help you
						grow and protect your brand.
					</p>
				</v-row>

				<v-row justify="center" class="mt-12 mb-md-0 mb-8">
					<v-col cols="10" sm="8" md="4" lg="3">
						<v-btn to="/auth/register" x-large depressed>Get Started Now</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<img class="mt-2" src="../assets/wave.svg" />
		<v-row justify="center" class="mb-12 mx-4">
			<v-col md="2" cols="12" class="mx-4">
				<v-row class="mt-12">
					<v-col align="center">
						<v-avatar color="rgb(255,80,80,0.15)" size="80">
							<v-icon x-large color="primary">mdi-clipboard-edit</v-icon>
						</v-avatar>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<p class="font-weight-medium white--text">
							Create, protect and delete your links and monitor them with
							detailed statistics.
						</p>
					</v-col>
				</v-row>
			</v-col>
			<v-col md="2" cols="12" class="mx-4">
				<v-row class="mt-12">
					<v-col align="center">
						<v-avatar color="rgb(255,80,80,0.15)" size="80">
							<v-icon x-large color="primary">mdi-chart-donut</v-icon>
						</v-avatar>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<p class="font-weight-medium white--text">
							Create new shortlinks and manage them. View stats and link
							analytics
						</p>
					</v-col>
				</v-row>
			</v-col>
			<v-col md="2" cols="12" class="mx-4">
				<v-row justify="center" class="mt-12">
					<v-col align="center">
						<v-avatar color="rgb(255,80,80,0.15)" size="80">
							<v-icon x-large color="primary">mdi-heart</v-icon>
						</v-avatar>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<p class="font-weight-medium white--text">
							Completely open source and free. You can host it on your own
							server.
						</p>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<v-row justify="center" class="mb-12">
			<v-col align="center" cols="12" md="8">
				<v-card
					color="#ff5050"
					class="pa-6 mb-10 mt-6 mx-4"
					rounded="xl"
					max-width="960px"
				>
					<v-row justify="center" align="center" class="px-4">
						<v-col cols="12" md="8" align="left" class="px-4 pt-6">
							<v-row justify="center" class="mt-3">
								<p class="contribution-text">
									Its free & open-source

									<v-icon color="#121212" x-large>mdi-heart</v-icon>
								</p>
							</v-row>
							<v-row justify="center" class="mt-2">
								<h3 class="text--secondary font-weight-medium">
									Contribute to the project or become a sponsor
								</h3>
							</v-row>

							<v-row class="mt-8 mb-4" justify="center">
								<v-btn
									href="https://github.com/sumitkolhe/reduced"
									dark
									target="_blank"
									x-large
									outlined
									class="font-weight-bold"
									rounded
								>
									Contribute
									<v-icon right>mdi-github</v-icon>
								</v-btn>
							</v-row>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>

		<Footer />
	</v-main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	layout: 'public',

	data() {
		return {
			drawer: false,
		}
	},
})
</script>

<style scoped>
.hero {
	height: auto;
	padding-top: 80px;
	background-color: #ff5050;
}

.contribution-text {
	font-size: 44px;
	font-weight: 600;
}

.main-title {
	font-size: 64px;
	font-weight: 700;
	max-width: 700px;
	letter-spacing: 2px;
	line-height: 80px;
	opacity: 95%;
}

.sub-title {
	padding-top: 12px;
	font-size: 22px;
	font-weight: 500;
	max-width: 600px;
	opacity: 50%;
}
</style>