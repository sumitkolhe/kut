<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field label="Email" outlined rounded v-model="email"
            >Email</v-text-field
          >
          <v-text-field label="Password" v-model="password"
            >Password</v-text-field
          >
        </v-col>
      </v-row>
      <v-row>
        <v-btn @click="registerUser()">Register</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>



<script lang="ts">
import Vue from 'vue'
import '@nuxtjs/axios'
//import { registerUser } from '../../app/controller/auth'

interface user {
  email: string
  password: string
}

export default Vue.extend({
  data(): user {
    return { email: '', password: '' }
  },

  methods: {
    async registerUser({ email, password }: user) {
      const ip = await this.$axios
        .post('http://localhost:80/api/auth/register', {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })

      console.log(ip)
    },
  },
})
</script>

<style>
</style>