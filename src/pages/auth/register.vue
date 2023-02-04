<script lang="ts" setup>
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import TextInput from 'components/atoms/inputs/text-input.vue'
import useValidate from 'vue-tiny-validate'
import { useAuthStore } from 'store/auth.store'
import PasswordInput from 'components/atoms/inputs/password-input.vue'
import type { Rules } from 'vue-tiny-validate'

definePageMeta({
  layout: 'public',
  auth: 'guest',
})

const { registerUser } = useAuthStore()

const loading = ref(false)
const registerData = reactive({ email: '', password: '' })

const rules: Rules = reactive({
  email: {
    name: 'required',
    test: (value: string) => value.length > 0,
    message: 'Email must not be empty.',
  },
  password: {
    name: 'required',
    test: (value: string) => value.length > 0,
    message: 'Password must not be empty.',
  },
})

const { result } = useValidate(registerData, rules)

const register = async () => {
  result.value.$test()
  if (!result.value.$invalid) {
    loading.value = true
    await registerUser(registerData.email, registerData.password)
    loading.value = false
  }
}
</script>

<template>
  <section class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
    <!-- Inner container  -->
    <div class="flex h-fit w-full max-w-xl flex-col rounded-lg dark:border-gray-700 lg:flex-row">
      <!-- Register Form  -->
      <div class="flex w-full flex-col items-center justify-center space-y-8 px-6 md:p-10 xl:p-14">
        <h1 class="mb-4 text-2xl font-medium tracking-wide dark:text-gray-200 xl:text-3xl">
          Create Account
        </h1>
        <!-- <div
          class="flex flex-col items-center justify-center w-full space-y-4 md:flex-row md:space-y-0 md:space-x-4"
        >
          <primary-button class="py-3 hover:bg-gray-700 hover:text-white">
            Sign up with Github
          </primary-button>
          <primary-button
            class="py-3 bg-red-500 hover:bg-red-600 hover:border-red-600 hover:text-white"
          >
            Sign up with Google
          </primary-button>
        </div>

        <div class="flex justify-center w-full border-b">
          <p
            class="inline-block px-2 text-sm font-medium leading-none tracking-wide text-gray-600 transform translate-y-2 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
          >
            Or sign up with an e-mail
          </p>
        </div> -->

        <form class="flex w-full flex-col items-center space-y-8">
          <div class="w-full space-y-4">
            <text-input
              v-model="registerData.email"
              label="Email"
              type="email"
              placeholder="john@doe.com"
              suffix-icon="ph:at"
              :errors="result.email.$messages"
            />
            <password-input
              v-model="registerData.password"
              label="Password"
              placeholder="********"
              suffix-icon="ph:password"
              :errors="result.password.$messages"
            />
          </div>

          <primary-button :loading="loading" @click="register"> Log in </primary-button>
        </form>
        <p class="text-center text-gray-600">
          Already have an account?
          <nuxt-link to="/auth/login" class="text-red-500 hover:underline">Log in</nuxt-link>
        </p>
      </div>
    </div>
  </section>
</template>
