<script lang="ts" setup>
import useValidate from 'vue-tiny-validate'
import TextInput from 'components/atoms/inputs/text-input.vue'
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import { useAuthStore } from 'store/auth.store'
import type { Rules } from 'vue-tiny-validate'

definePageMeta({
  layout: 'public',
})

const { loginUser } = useAuthStore()

const loading = ref(false)
const loginData = reactive({ email: '', password: '' })

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

const { result } = useValidate(loginData, rules)

const login = async () => {
  result.value.$test()
  if (!result.value.$invalid) {
    loading.value = true
    await loginUser(loginData.email, loginData.password)
    loading.value = false
  }
}
</script>

<template>
  <section class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
    <!-- Inner container  -->
    <div class="flex flex-col w-full max-w-2xl rounded-lg h-fit lg:flex-row dark:border-gray-700">
      <!-- Login Form  -->
      <div class="flex flex-col items-center justify-center w-full p-4 space-y-8 md:p-10 xl:p-14">
        <h1 class="mb-4 text-2xl font-medium tracking-wide xl:text-3xl dark:text-gray-200">
          Log in
        </h1>
        <!-- <div
          class="flex flex-col items-center justify-center w-full space-y-4 md:flex-row md:space-y-0 md:space-x-4"
        >
          <primary-button class="py-3 md:text-base hover:bg-gray-700 hover:text-white">
            Sign up with Github
          </primary-button>
          <base-button
            class="py-3 bg-red-500 hover:bg-red-600 hover:border-red-600 hover:text-white"
          >
            Sign up with Google
          </base-button>
        </div>

        <div class="flex justify-center w-full border-b">
          <p
            class="inline-block px-2 text-sm font-medium leading-none tracking-wide text-gray-600 transform translate-y-2 bg-white dark:text-gray-200 dark:bg-gray-800"
          >
            Or Log in with an e-mail
          </p>
        </div> -->

        <form class="flex flex-col items-center w-full space-y-4">
          <text-input
            v-model="loginData.email"
            label="Email"
            type="email"
            placeholder="john@doe.com"
            suffix-icon="ph:at"
            :errors="result.email.$messages"
          />
          <text-input
            v-model="loginData.password"
            label="Password"
            type="password"
            placeholder="********"
            suffix-icon="ph:password"
            :errors="result.password.$messages"
          />
          <primary-button :loading="loading" @click="login"> Log in </primary-button>
        </form>
        <p class="text-center text-gray-600">
          Don't have an account?
          <nuxt-link to="/auth/register" class="text-red-500 hover:underline">Register</nuxt-link>
        </p>
      </div>
    </div>
  </section>
</template>
