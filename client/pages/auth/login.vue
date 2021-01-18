<template>
	<v-row justify="center" align="center">
		<v-col cols="12" align="center">
			<img class="logo" src="../../assets/banner.svg" />
			<v-card
				rounded="lg"
				elevation="7"
				class="mx-4 mt-4 pa-8"
				max-width="500px"
			>
				<p class="font-weight-bold text-h5 secondary--text text-center">
					Login
				</p>

				<p class="pb-6 font-weight-regular text--disabled text-center">
					Welcome back! login into your account.
				</p>

				<v-form ref="form" v-model="isFormValid" lazy-validation>
					<p class="mb-2 font-weight-medium">E-mail / Username</p>
					<v-text-field
						v-model="login.user_name"
						:rules="[rules.required, rules.noSpace]"
						placeholder="John Doe"
						append-icon="mdi-email"
						outlined
						required
					></v-text-field>
					<p class="mb-2 font-weight-medium mt-n1">Password</p>
					<v-text-field
						v-model="login.password"
						:rules="[rules.required, rules.min, rules.npSpace]"
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
						color="primary"
						value="Remember me"
					></v-checkbox>

					<v-btn
						block
						large
						elevation="1"
						:loading="loading"
						:disabled="!isFormValid"
						color="primary"
						@click="loginUser"
					>
						<v-icon left>mdi-email</v-icon>
						Login
					</v-btn>

					<v-row>
						<v-col>
							<p class="font-weight-medium mt-6 text-left">
								New user?
								<NuxtLink class="text-decoration-none" to="register">
									Sign Up
								</NuxtLink>
							</p>
						</v-col>
						<v-col>
							<p class="font-weight-medium mt-6 text-right">
								<NuxtLink class="text-decoration-none" to="forgot-password">
									Forgot password?
								</NuxtLink>
							</p>
						</v-col>
					</v-row>
				</v-form>
			</v-card>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	layout: 'public',

	data() {
		return {
			isFormValid: true,
			rememberMe: false,
			loading: false,
			showPassword: false,

			rules: {
				required: (v: any) => !!v || 'Field is Required',
				min: (v: any) => v.length >= 6 || 'Must be atleast 6 characters',
				email: (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
				noSpace: (v: any) =>
					v.split(' ').length <= 1 || 'Must not contain blank space',
			},

			login: {
				user_name: '',
				password: '',
			},
		}
	},

	methods: {
		async loginUser() {
			if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
				this.loading = true
				try {
					await this.$auth.loginWith('local', {
						data: this.login,
					})
					this.loading = false
					;(this as any).$notify.success('Login Successful')

					if (this.$auth.loggedIn)
						setTimeout(() => {
							this.$router.push('/user/dashboard')
						}, 1000)
				} catch (error) {
					this.loading = false
					;(this as any).$notify.err(error.response.data.message)
				}
			}
		},
	},
})
</script>

<style scoped>
.logo {
	pointer-events: none;
}
</style>
