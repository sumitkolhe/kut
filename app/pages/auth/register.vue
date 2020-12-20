<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="register.userName"
      :counter="10"
      :rules="usernameRules"
      label="UsernName"
      required
    ></v-text-field>
    <v-text-field
      v-model="register.email"
      :counter="10"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>
    <v-text-field
      v-model="register.password"
      label="Password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="registerUser"
    >
      Register
    </v-btn>

    hi {{ status }}
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import '@nuxtjs/auth-next'
export default Vue.extend({
  data() {
    return {
      valid: true,
      status: '',
      usernameRules: [
        (v: any) => !!v || 'Name is required',
        (v: any) =>
          (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],

      emailRules: [
        (v: any) => !!v || 'E-mail is required',
        (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      register: {
        userName: '',
        email: '',
        password: '',
      },
    }
  },

  methods: {
    async registerUser() {
      const result: any = await this.$auth.loginWith('local', {
        data: this.register,
      })
      this.status = result.data.userDetails.userName
      console.log(this.status)
    },
  },
})
</script>

<style>
</style>