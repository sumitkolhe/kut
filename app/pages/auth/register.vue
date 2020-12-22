<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col class="f"></v-col>
      <v-col class="ff" align-self="center">
        <v-sheet class="ff">
          <v-row
            v-for="feature in features"
            :key="feature.title"
            class="justify-center"
          >
            <h2>{{ feature.title }}</h2>
            <br />
            <h3>{{ feature.description }}</h3>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
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

      features: [
        { title: 'hello', description: 'ougboulv' },
        { title: 'hello', description: 'cul' },
        { title: 'hello', description: 'txy' },
        { title: 'hello', description: 'xtyxty' },
      ],
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
.f {
  background-color: #f1f5f9;
}

.ff {
  background-color: green;
}
</style>