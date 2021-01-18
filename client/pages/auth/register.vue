<template>
	<v-row justify="center" align="center" class="bg">
		<v-col cols="12" align="center">
			<v-card
				rounded="lg"
				elevation="16"
				class="mx-4 mt-4 pa-8"
				max-width="500px"
			>
				<img class="logo mb-2" src="../../assets/logo/logo.svg" />
				<p class="font-weight-bold text-h5 secondary--text text-center">
					Sign Up on {{ title }}
				</p>

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
						<v-icon left>mdi-send-outline</v-icon>
						Create an account
					</v-btn>

					<p class="font-weight-medium mt-4 text-md-left text-center">
						Already have an account?
						<NuxtLink class="text-decoration-none primary--text" to="login">
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
.bg {
	background: url('../../assets/bg.svg');
	background-size: 100%;
}
.logo {
	pointer-events: none;
}
</style>
