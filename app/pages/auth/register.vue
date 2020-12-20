<template>
  <v-container>
    <v-text-field
      label="Email"
      placeholder="Placeholder"
      outlined
      v-model="email"
    ></v-text-field>
    <v-text-field
      label="Password"
      placeholder="Placeholder"
      outlined
      v-model="password"
    ></v-text-field>
    <v-btn @click="registerUser()">Register</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import '@nuxtjs/axios'
export default Vue.extend({
  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    async registerUser() {
      let payload = {
        email: this.email,
        password: this.password,
      }
      console.log(payload)
      const result = await this.$axios.$post(
        'http://localhost/api/auth/register',
        payload
      )

      console.log(result)
    },
  },
})
</script>

<style>
</style>