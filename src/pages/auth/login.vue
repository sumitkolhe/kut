<script lang="ts" setup>
import useValidate from 'vue-tiny-validate'
import BaseInput from 'components/molecules/base-input.vue'
import BaseButton from 'components/atoms/base-button.vue'
import type { Rules } from 'vue-tiny-validate'

definePageMeta({
  layout: 'public',
})

const { $auth } = useNuxtApp()

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
    await $auth
      .login(loginData.email, loginData.password)
      .then(() => useRouter().push('/dashboard'))
    loading.value = false
  }
}
</script>

<template>
  <section class="bg-gray-100 flex justify-center min-h-screen">
    <!-- Inner container  -->
    <div
      class="max-w-2xl w-full flex flex-col md:m-8 lg:m-16 lg:flex-row shadow-xl border rounded-lg bg-white"
    >
      <!-- Login Form  -->
      <div
        class="w-full space-y-8 justify-center flex-col items-center flex px-6 py-10 md:p-10 xl:p-16"
      >
        <h1 class="text-2xl xl:text-3xl font-extrabold mb-4">Log in</h1>
        <div
          class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full justify-center"
        >
          <base-button class="py-3 md:text-base hover:bg-gray-700 hover:text-white">
            Sign up with Github
          </base-button>
          <base-button
            class="py-3 bg-red-500 hover:bg-red-600 hover:border-red-600 hover:text-white"
          >
            Sign up with Google
          </base-button>
        </div>

        <div class="border-b flex w-full justify-center">
          <p
            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-2"
          >
            Or Log in with an e-mail
          </p>
        </div>

        <form class="w-full space-y-4">
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
          <base-button :loading="loading" class="py-3" @click="login">Log in</base-button>
        </form>
        <p class="text-center text-gray-600">
          Don't have an account?
          <nuxt-link to="/auth/register" class="hover:underline text-red-500">Register</nuxt-link>
        </p>
      </div>
    </div>
  </section>
</template>
