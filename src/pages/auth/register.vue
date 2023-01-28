<script lang="ts" setup>
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import TextInput from 'components/atoms/inputs/text-input.vue'
import useValidate from 'vue-tiny-validate'
import { useAuthStore } from 'store/auth.store'
import type { Rules } from 'vue-tiny-validate'

definePageMeta({
  layout: 'public',
})

const { registerUser } = useAuthStore()
const { createAccountPoints } = useAppConfig()

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
  <section class="flex min-h-screen justify-center bg-gray-100 dark:bg-gray-800">
    <!-- Inner container  -->
    <div class="flex max-w-screen-2xl flex-col lg:flex-row">
      <!-- Register Form  -->
      <div
        class="flex min-h-screen w-full flex-col items-center justify-center space-y-8 px-6 md:mt-0 md:h-full md:p-10 lg:w-1/2 xl:p-24"
      >
        <h1 class="mb-4 text-2xl font-medium dark:text-gray-200 xl:text-3xl">Create Account</h1>
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

        <form class="w-full space-y-4">
          <!-- <base-input label="First Name" type="text" placeholder="john" suffix-icon="ph:at" />
              <base-input label="Last Name" type="text" placeholder="doe" suffix-icon="ph:at" /> -->
          <text-input
            v-model="registerData.email"
            label="Email"
            type="email"
            placeholder="john@doe.com"
            suffix-icon="ph:at"
            :errors="result.email.$messages"
          />
          <text-input
            v-model="registerData.password"
            label="Password"
            type="password"
            placeholder="********"
            suffix-icon="ph:password"
            :errors="result.password.$messages"
          />
          <primary-button :loading="loading" @click="register">Sign up</primary-button>
        </form>
        <p class="text-center text-gray-600">
          Already have an account?
          <nuxt-link to="/auth/login" class="text-red-500 hover:underline">Log in</nuxt-link>
        </p>
      </div>
      <!-- Features  -->
      <div
        class="flex w-full flex-col items-start justify-center space-y-8 rounded-tr-lg rounded-br-lg bg-gray-100 px-6 py-12 dark:bg-gray-800 md:p-10 lg:w-1/2 xl:p-16"
      >
        <div
          v-for="feature in createAccountPoints"
          :key="feature.title"
          class="flex items-start justify-start space-x-3"
        >
          <Icon name="ph:check-circle-duotone" size="32" class="text-red-500" />

          <div class="space-y-1">
            <p class="text-left text-lg font-medium text-gray-900 dark:text-gray-200">
              {{ feature.title }}
            </p>
            <p class="text-left text-gray-900 dark:text-gray-300">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
