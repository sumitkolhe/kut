<template>
	<v-row class="fill-height">
		<v-col md="4" cols="12" class="d-flex align-center">
			<v-row justify="center">
				<div class="login-form">
					<p
						class="font-weight-bold text-h3 secondary--text text-md-left text-center"
					>
						Sign Up
					</p>

					<p
						class="pb-6 font-weight-regular text-h6 text--disabled text-md-left text-center"
					>
						Create a new account to enjoy Reduced
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
							:rules="[rules.required, rules.min]"
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
							:disabled="!isFormValid"
							color="secondary"
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
				</div>
			</v-row>
		</v-col>
		<v-col
			d-none
			d-md-block
			md="8"
			cols="12"
			class="d-flex align-center primary hero"
		></v-col>
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
				try {
					await this.$axios.post('/auth/register', this.register)

					await this.$auth.loginWith('local', {
						data: {
							email: this.register.email,
							password: this.register.password,
						},
					})
					this.$store.commit('notification/showNotification', {
						message: 'Registered successfully',
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
			}
		},
	},
})
</script>

<style scoped>
.hero {
	background: url('../../assets/camping.svg') no-repeat center;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: 100%;
}

.login-form {
	min-width: 300px;
	max-width: 500px;
	margin: 30px 0px;
}
</style>
