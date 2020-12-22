<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col class="login-form"
        ><v-card class="pa-6" rounded>
          <v-card-title>Login into your account</v-card-title>
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
              required
              outlined
            ></v-text-field>

            <v-btn :disabled="!valid" color="primary" @click="loginUser">
              Login
            </v-btn>
          </v-form>
          <div v-if="$auth.loggedIn">{{ $auth.loggedIn }}</div>
        </v-card></v-col
      >
    </v-row>
    <v-btn @click="logout()">logout</v-btn>
  </v-container>
</template> 

<script lang="ts">
import Vue from 'vue'
import '@nuxtjs/auth-next'
export default Vue.extend({
  layout: 'blank',
  data() {
    return {
      valid: true,
      status: '',
      usernameRules: [
        (v: any) => !!v || 'Username or email is required',
        (v: any) =>
          (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],

      emailRules: [
        (v: any) => !!v || 'E-mail is required',
        (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      login: {
        userName: '',

        password: '',
      },
    }
  },

  methods: {
    async loginUser() {
      await this.$auth.loginWith('local', {
        data: this.login,
      })
    },

    async logout() {
      await this.$auth.logout()
    },
  },
})
</script>

<style >
#app {
  background-image: url('../../assets/bg.png');
}

.v-text-field {
  width: 400px;
}
.login-form {
  max-width: 450px;
  text-align: center;
}
</style>