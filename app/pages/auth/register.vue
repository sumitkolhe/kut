<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col>
        <v-row> <img class="mb-12" src="~/assets/banner.svg" /></v-row>
        <v-row
          ><p
            class="font-weight-bold text-h3 text-center mt-12 secondary--text"
          >
            Hey 👋
          </p></v-row
        >
        <v-row
          ><p
            class="font-weight-medium text-h4 mt-2 text-center mb-12 secondary--text"
          >
            Create your Free Account
          </p></v-row
        >
        <v-row
          ><v-form
            ref="form"
            class="register-form"
            v-model="valid"
            lazy-validation
          >
            <p class="mb-1">Username</p>
            <v-text-field
              v-model="register.userName"
              :rules="usernameRules"
              placeholder="John Doe"
              outlined
              required
            ></v-text-field>
            <p class="mb-1">E-mail</p>
            <v-text-field
              v-model="register.email"
              :rules="emailRules"
              placeholder="john@doe.com"
              outlined
              required
            ></v-text-field>
            <p class="mb-1">Password</p>
            <v-text-field
              v-model="register.password"
              :rules="passwordRules"
              placeholder="***********"
              outlined
              required
            ></v-text-field>

            <v-btn
              class="mt-2"
              block
              large
              :disabled="!valid"
              color="primary"
              @click="registerUser"
            >
              Create Account
            </v-btn>
          </v-form></v-row
        >
        <v-row class="mt-4"
          >Already have an account?
          <NuxtLink to="/auth/login"> Log in </NuxtLink></v-row
        >
      </v-col>
      <v-col class="full-height">
        <div class="register-features">
          <div v-for="feature in features" :key="feature.title">
            <div>
              <v-icon color="accent">mdi-check-circle</v-icon>
              <span class="ml-3 accent--text h5 font-weight-bold">
                {{ feature.title }}</span
              >
            </div>
            <div class="ml-10 mb-12">
              {{ feature.description }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template> 

<script lang="ts">
import Vue from 'vue'
import '@nuxtjs/auth-next'
export default Vue.extend({
  layout: 'guest',
  data() {
    return {
      valid: false,
      status: '',
      usernameRules: [
        (v: any) => !!v || 'Username is required',
        (v: any) =>
          (v && v.length <= 10) || 'Username must be less than 10 characters',
      ],
      emailRules: [
        (v: any) => !!v || 'E-mail is required',
        (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v: any) => !!v || 'Password is required',
        (v: any) => /^.{6,}$/.test(v) || 'Password must be min 6 characters',
      ],

      register: {
        userName: '',
        email: '',
        password: '',
      },

      features: [
        {
          title: 'Free account',
          description:
            'Create apps, connect databases and add-on services, and collaborate on your apps, for free. ',
        },
        {
          title: 'Your app platform',
          description:
            'A platform for apps, with app management & instant scaling, for development and production. ',
        },
        {
          title: 'Deploy now',
          description:
            'Go from code to running app in minutes. Deploy, scale, and deliver your app to the world. ',
        },
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
.register-features {
  margin-top: 250px;
  background-color: crimson;
}

.register-form {
  width: 480px;
}
</style>