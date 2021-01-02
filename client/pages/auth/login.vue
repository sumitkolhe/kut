<template>
	<v-row class="fill-height">
		<v-col
			d-none
			d-md-block
			md="6"
			cols="12"
			class="d-flex align-center accent hero"
		></v-col>
		<v-col md="6" cols="12" class="d-flex align-center">
			<v-row justify="center">
				<div class="login-form">
					<p
						class="font-weight-bold text-h3 secondary--text text-md-left text-center"
					>
						Login
					</p>

					<p
						class="pb-6 font-weight-regular text-h6 text--disabled text-md-left text-center"
					>
						Welcome back! Please login into your account.
					</p>

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
							:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
							@click:append="showPassword = !showPassword"
							:type="showPassword ? 'text' : 'password'"
							placeholder="***********"
							required
							outlined
						></v-text-field>

						<v-checkbox
							class="mt-n2"
							label="Remember me"
							color="accent"
							value="Remember me"
						></v-checkbox>

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

						<p class="font-weight-medium mt-4 text-md-left text-center">
							Don't have an account?
							<NuxtLink class="text-decoration-none accent--text" to="register">
								Create an account
							</NuxtLink>
						</p>
					</v-form>
				</div>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	layout: 'public',

	data() {
		return {
			valid: true,
			rememberMe: false,
			showPassword: false,
			usernameRules: [
				(v: any) => !!v || 'Username or email is required',
				(v: any) =>
					(v && v.length <= 30 && v.split(' ').length <= 1) ||
					'Name must be less than 30 characters',
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
				this.$store.commit('notification/showNotification', {
					message: 'Login successful',
					color: 'success',
				})

				if (this.$auth.loggedIn)
					setTimeout(() => {
						this.$router.push('/user/dashboard')
					}, 1000)
			} catch (error) {
				this.$store.commit('notification/showNotification', {
					message: error.response.data.message,
					color: 'error',
				})
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
	margin: 30px 0px;
}
</style>
