<script lang="ts" setup>
import { useAuthStore } from 'store/auth.store'
import useValidate from 'vue-tiny-validate'
import BaseInput from 'components/molecules/base-input.vue'
import BaseButton from 'components/atoms/base-button.vue'
import type { Rules } from 'vue-tiny-validate'

definePageMeta({
  layout: 'public',
})

const AuthStore = useAuthStore()

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
    await AuthStore.login(loginData.email, loginData.password)
    loading.value = false
  }
}
</script>

<template>
  <section class="bg-gray-50 h-screen mx-auto">
    <header class="flex items-center justify-center py-4 border-b border-gray-200 space-x-2">
      <icon name="ph:link-break" size="36" class="text-red-500" />
      <p class="text-xl font-medium text-red-500 uppercase">Trym</p>
    </header>

    <div
      class="w-full md:border max-w-lg mx-auto pt-6 pb-8 rounded-md bg-gray-50 md:bg-white md:mt-24"
    >
      <h1 class="text-xl font-medium text-center text-gray-800">Login</h1>
      <form class="mt-8 space-y-4">
        <base-input
          v-model="loginData.email"
          label="Email"
          type="email"
          placeholder="john@doe.com"
          suffix-icon="ph:at"
          :errors="result.email.$messages"
        />

        <base-input
          v-model="loginData.password"
          label="Password"
          type="password"
          placeholder="********"
          suffix-icon="ph:password"
          :errors="result.password.$messages"
        />

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-900 text-black focus:border-black focus:ring-black"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-600">Remember me</label>
          </div>

          <div class="text-sm">
            <nuxt-link to="/login" class="hover:underline text-red-500"
              >Forgot your password?</nuxt-link
            >
          </div>
        </div>

        <base-button :loading="loading" @click="login">Login</base-button>
      </form>
      <p class="text-center text-gray-600 mt-4">
        Don't have an account?
        <nuxt-link to="/register" class="hover:underline text-red-500">Sign up</nuxt-link>
      </p>
    </div>
  </section>
</template>
