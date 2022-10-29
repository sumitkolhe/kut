<script lang="ts" setup>
import BaseButton from 'components/atoms/base-button.vue'
import BaseInput from 'components/molecules/base-input.vue'
import useValidate from 'vue-tiny-validate'
import type { Rules } from 'vue-tiny-validate'
definePageMeta({
  layout: 'public',
})

const { createAccountPoints } = useAppConfig()
const { $auth } = useNuxtApp()

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
    await $auth.register(registerData.email, registerData.password)

    loading.value = false
  }
}
</script>

<template>
  <section class="bg-gray-100 flex justify-center min-h-screen">
    <!-- Inner container  -->
    <div
      class="max-w-screen-2xl flex flex-col md:m-8 lg:m-16 lg:flex-row shadow-xl border rounded-lg bg-white"
    >
      <!-- Register Form  -->
      <div
        class="w-full lg:w-1/2 space-y-8 justify-center flex-col items-center flex px-6 py-10 md:p-10 xl:p-24"
      >
        <h1 class="text-2xl xl:text-3xl font-extrabold mb-4">Create Account</h1>
        <div
          class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full justify-center"
        >
          <base-button class="py-3 hover:bg-gray-700 hover:text-white">
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
            Or sign up with an e-mail
          </p>
        </div>

        <form class="w-full space-y-4">
          <!-- <base-input label="First Name" type="text" placeholder="john" suffix-icon="ph:at" />
              <base-input label="Last Name" type="text" placeholder="doe" suffix-icon="ph:at" /> -->
          <base-input
            v-model="registerData.email"
            label="Email"
            type="email"
            placeholder="john@doe.com"
            suffix-icon="ph:at"
            :errors="result.email.$messages"
          />
          <base-input
            v-model="registerData.password"
            label="Password"
            type="password"
            placeholder="********"
            suffix-icon="ph:password"
            :errors="result.password.$messages"
          />
          <base-button :loading="loading" class="py-3" @click="register">Sign up</base-button>
        </form>
        <p class="text-center text-gray-600">
          Already have an account?
          <nuxt-link to="/auth/login" class="hover:underline text-red-500">Log in</nuxt-link>
        </p>
      </div>
      <!-- Features  -->
      <div
        class="bg-gray-100 w-full lg:w-1/2 space-y-8 justify-center flex-col items-start flex py-12 px-6 md:p-10 xl:p-16 rounded-tr-lg rounded-br-lg"
      >
        <div
          v-for="feature in createAccountPoints"
          :key="feature.title"
          class="flex space-x-3 items-start justify-start"
        >
          <Icon name="ph:check-circle-duotone" size="32" class="text-red-500" />

          <div class="space-y-1">
            <p class="text-lg font-medium text-black text-left">{{ feature.title }}</p>
            <p class="text-black text-left">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
