<template>
	<v-row class="fill-height">
		<v-col
			md="6"
			cols="12"
			class="d-flex hero align-center accent d-none d-md-block"
		></v-col>
		<v-col md="6" cols="12" class="d-flex align-center">
			<v-row justify="center">
				<div class="login-form">
					<v-row>
						<p class="px-3 font-weight-bold text-h3 secondary--text">Login</p>
					</v-row>
					<v-row>
						<p class="px-3 pb-6 font-weight-regular text-h6 text--disabled">
							Welcome back! Please login into your account.
						</p>
					</v-row>

					<v-form ref="form" v-model="valid" lazy-validation>
						<p class="mb-2 font-weight-medium">E-mail / Username</p>
						<v-text-field
							v-model="login.userName"
							:rules="usernameRules"
							placeholder="John Doe"
							append-icon="mdi-email"
							outlined
							required
						></v-text-field>
						<p class="mb-2 font-weight-medium mt-n1">Password</p>
						<v-text-field
							v-model="login.password"
							:rules="passwordRules"
							append-icon="mdi-lock"
							placeholder="***********"
							required
							outlined
						></v-text-field>

						<v-row class="mt-n8 mb-n4">
							<v-col>
								<v-checkbox color="accent">
									<template v-slot:label>Remember me</template>
								</v-checkbox>
							</v-col>
						</v-row>

						<v-btn
							block
							large
							elevation="1"
							:disabled="!valid"
							color="secondary"
							@click="loginUser"
						>
							<v-icon left>mdi-send-outline</v-icon>
							Login
						</v-btn>
						<v-row justify="center" class="mt-4 px-3">
							<p class="font-weight-medium">
								Don't have an account?
								<NuxtLink
									class="text-decoration-none accent--text"
									to="register"
								>
									Create an account
								</NuxtLink>
							</p>
						</v-row>
					</v-form>
				</div>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import '@nuxtjs/auth-next'

export default Vue.extend({
	layout: 'public',

	data() {
		return {
			valid: true,
			status: '',
			error: false,
			rememberMe: false,
			usernameRules: [
				(v: any) => !!v || 'Username or email is required',
				(v: any) =>
					(v && v.length <= 10) || 'Name must be less than 10 characters',
			],

			emailRules: [
				(v: any) => !!v || 'E-mail is required',
				(v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
			passwordRules: [
				(v: any) => !!v || 'Password is required',
				(v: any) => /^.{6,}$/.test(v) || 'Password must be min 6 characters',
			],

			login: {
				userName: '',
				password: '',
			},
		}
	},

	methods: {
		async loginUser() {
			try {
				await this.$auth.loginWith('local', {
					data: this.login,
				})
			} catch (error) {
				this.error = true
			}
		},
	},
})
</script>

<style scoped>
.hero {
	background: url('../../assets/cat.svg') no-repeat center;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: 70%;
}

.login-form {
	min-width: 300px;
	max-width: 500px;
	text-align: left;
	padding: 0px 25px;
}
</style>
