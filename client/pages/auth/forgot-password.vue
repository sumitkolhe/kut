<template>
	<v-row justify="center" align="center" class="bg">
		<v-col cols="12" align="center">
			<img class="mb-2" src="../../assets/banner/banner.svg" />
			<v-card
				outlined
				class="mx-md-4 mx-2 mt-4 px-md-8 px-4 py-6"
				max-width="500px"
			>
				<h3 class="font-weight-bold mb-2 primary--text text-center">
					Forgot Password?
				</h3>

				<p class="mb-6 mt-n1 font-weight-regular text--disabled text-center">
					Enter the email address associated with your account
				</p>

				<v-form ref="form" v-model="isFormValid" lazy-validation>
					<p class="mb-2 font-weight-medium">E-mail</p>
					<v-text-field
						v-model="login.user_name"
						:rules="[rules.required, rules.noSpace]"
						placeholder="John Doe"
						append-icon="mdi-email"
						outlined
						required
					></v-text-field>

					<v-btn
						block
						large
						elevation="1"
						:loading="loading"
						:disabled="!isFormValid"
						color="primary"
						@click="loginUser"
					>
						<svg-icon name="email" class="mr-2"></svg-icon>
						Reset Password
					</v-btn>

					<v-row justify="center">
						<v-col>
							<v-row justify="center">
								<p class="font-weight-medium mt-10">
									<NuxtLink class="accent--text text-decoration-none" to="/">
										Go Back
									</NuxtLink>
								</p>
							</v-row>
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
			title: process.env.APP_NAME,

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
						}, 1500)
				} catch (error) {
					this.loading = false
					;(this as any).$notify.error(error.response.data.message)
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
.v-card.v-sheet.theme--light {
	border: 2px solid rgba(0, 0, 0, 0.1) !important;
	border-radius: 16px !important;
}
</style>
