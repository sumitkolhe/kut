<template>
	<v-row justify="center" align="center" class="bg">
		<v-col cols="12" align="center">
			<img class="logo mb-2" src="../../assets/logo/logo.svg" />
			<v-card
				outlined
				class="mx-md-4 mx-2 mt-4 px-md-8 px-4 py-6"
				max-width="500px"
			>
				<h3 class="font-weight-bold mb-2 primary--text text-center">
					Sign Up on {{ title }}
				</h3>

				<p class="mb-6 mt-n1 font-weight-regular text--disabled text-center">
					Create a new account
				</p>

				<v-form ref="form" v-model="isFormValid" lazy-validation>
					<p class="mb-2 font-weight-medium">Username</p>
					<v-text-field
						v-model="register.user_name"
						:rules="[rules.required, rules.noSpace]"
						placeholder="John Doe"
						append-icon="mdi-account-circle"
						outlined
						required
					></v-text-field>
					<p class="mb-2 font-weight-medium">E-mail</p>
					<v-text-field
						v-model="register.email"
						:rules="[rules.required, rules.email]"
						placeholder="John@Doe.com"
						append-icon="mdi-email"
						outlined
						required
					></v-text-field>
					<p class="mb-2 font-weight-medium mt-n1">Password</p>
					<v-text-field
						v-model="register.password"
						:rules="[rules.required, rules.min, rules.noSpace]"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
						:type="showPassword ? 'text' : 'password'"
						placeholder="***********"
						required
						outlined
					></v-text-field>

					<v-btn
						block
						large
						elevation="1"
						:loading="loading"
						:disabled="!isFormValid"
						color="primary"
						@click="registerUser"
					>
						<svg-icon name="email" class="mr-2"></svg-icon>
						Create an account
					</v-btn>

					<p class="font-weight-medium mt-6 text-center">
						Already have an account?
						<NuxtLink class="text-decoration-none accent--text" to="login">
							Login
						</NuxtLink>
					</p>
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
			showPassword: null,
			loading: false,
			title: process.env.APP_NAME,
			rules: {
				required: (v: any) => !!v || 'Field is Required',
				min: (v: any) => v.length >= 6 || 'Must be atleast 6 characters',
				email: (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
				noSpace: (v: any) =>
					v.split(' ').length <= 1 || 'Must not contain blank space',
			},

			register: {
				user_name: '',
				email: '',
				password: '',
			},
		}
	},

	methods: {
		async registerUser() {
			if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
				this.loading = true
				try {
					await this.$axios.post('/auth/register', this.register)

					await this.$auth.loginWith('local', {
						data: {
							email: this.register.email,
							password: this.register.password,
						},
					})
					this.loading = false
					;(this as any).$notify.success('Registered Successfully')

					if (this.$auth.loggedIn)
						setTimeout(() => {
							this.$router.push('/user/dashboard')
						}, 1000)
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
.v-card.v-sheet.theme--light {
	border: 2px solid rgba(0, 0, 0, 0.1) !important;
	border-radius: 16px !important;
}
.logo {
	pointer-events: none;
}
</style>
