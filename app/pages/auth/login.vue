<template>
  <v-container fill-height fluid class="bg">
    <v-row align="center" justify="center">
      <v-card class="pa-6 login-form" outlined rounded="lg"
        ><img class="mb-6" src="~/assets/banner.svg" />
        <p class="text-h5 text-center">Login into your account</p>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="login.userName"
            :rules="usernameRules"
            label="Username / E-mail"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="login.password"
            label="Password"
            :rules="passwordRules"
            required
            outlined
          ></v-text-field>

          <v-btn
            class="mt-2"
            block
            :disabled="!valid"
            color="primary"
            @click="loginUser"
          >
            Login
          </v-btn>
        </v-form>
        <v-card-actions class="mt-4" align="center">
          <NuxtLink to="/auth/register"> Create an account </NuxtLink>
          <v-btn text> Forgot Password? </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-snackbar v-model="error" color="accent">
      Invalid email and password combination
    </v-snackbar>
  </v-container>
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
.bg {
  background-image: url('../../assets/bg.png');
  background-size: cover;
  background-color: #1e1e1e;
}

.login-form {
  width: 500px;
  text-align: center;
}
</style>

