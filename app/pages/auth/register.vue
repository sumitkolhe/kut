<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col align="center" justify="center">
        <v-form ref="form" v-model="valid" class="register-form" lazy-validation
          ><p class="font-weight-medium text-h4 text-left pb-4">
            Sign up to our product today for free
          </p>
          <v-text-field
            v-model="register.userName"
            :rules="usernameRules"
            label="Username"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="register.email"
            :rules="emailRules"
            label="E-mail"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="register.password"
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
            @click="registerUser"
          >
            Login
          </v-btn>
        </v-form>
      </v-col>
      <v-col align="center" align-self="center" class="fill-height">
        <div class="register-features">
          <img class="mb-4" src="~/assets/b.svg" />

          <div v-for="feature in features" :key="feature.title">
            <div>
              <v-icon color="accent">mdi-check-circle</v-icon>
              <span class="ml-3 accent--text h5"> {{ feature.title }}</span>
            </div>
            <div class="ml-10 mb-8">
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
  layout: 'blank',
  data() {
    return {
      valid: true,
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
  max-width: 700px;
  text-align: left;
  margin-bottom: 24px;
}

.register-form {
  max-width: 500px;
}
</style>