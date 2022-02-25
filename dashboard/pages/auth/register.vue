<template>
  <v-row justify="center" align="center" class="mt-12">
    <v-col cols="12" md="6">
      <h2 class="font-weight-bold mb-6 text-center">Log in to Small/ish</h2>

      <v-form ref="loginForm" v-model="isFormValid" lazy-validation>
        <v-text-field
          v-model="login.email"
          :rules="[rules.required, rules.noSpace]"
          placeholder="Email Address"
          append-icon="mdi-at"
          outlined
          required
          color="background"
        ></v-text-field>
        <v-text-field
          v-model="login.password"
          :rules="[rules.required, rules.min, rules.noSpace]"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          required
          outlined
          color="background"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-checkbox
          class="mt-n2"
          label="Remember me"
          color="background"
          value="Remember me"
        ></v-checkbox>

        <v-btn
          block
          large
          depressed
          class="foreground--text text-none"
          :loading="loading"
          :disabled="!isFormValid"
          color="background"
          @click="loginUser"
        >
          Login
        </v-btn>

        <v-row justify="center">
          <v-col>
            <v-row justify="center">
              <p class="font-weight-medium mt-10 background--text">
                Don't have an account?
                <NuxtLink
                  class="success--text text-decoration-none"
                  to="register"
                >
                  Sign Up
                </NuxtLink>
              </p>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import '@nuxtjs/auth-next'
import {
  defineComponent,
  useContext,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'
export default defineComponent({
  auth: 'guest',
  setup() {
    const loginForm = ref()
    const context = useContext()
    const router = useRouter()
    const isFormValid = true
    let loading = false
    const showPassword = false

    const rules = {
      required: (v: any) => !!v || 'Field is Required',
      min: (v: any) => v.length >= 6 || 'Must be atleast 6 characters',
      email: (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      noSpace: (v: any) =>
        v.split(' ').length <= 1 || 'Must not contain blank space',
    }
    const login = {
      email: '',
      password: '',
    }

    const loginUser = async () => {
      if (loginForm.value.validate()) {
        loading = true
        try {
          await context.$auth.loginWith('local', {
            data: login,
          })
          loading = false
          ;(this as any).$notify.success('Login Successful')

          if (context.$auth.loggedIn)
            setTimeout(() => {
              router.push('/dashboard')
            }, 1500)
        } catch (error) {
          loading = false
        }
      }
    }

    return {
      loginUser,
      login,
      loading,
      rules,
      showPassword,
      loginForm,
      isFormValid,
    }
  },
})
</script>
