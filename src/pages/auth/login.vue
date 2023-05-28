<script lang="ts" setup>
import useValidate from 'vue-tiny-validate'
import TextInput from 'components/atoms/input/text-input.vue'
import PasswordInput from 'components/atoms/input/password-input.vue'
import PrimaryButton from 'components/atoms/button/primary-button.vue'
import { useAuthStore } from 'store/auth.store'
import type { Rules } from 'vue-tiny-validate'

definePageMeta({
  layout: 'public',
  auth: 'guest',
})

const {
  public: { githubClientId },
} = useRuntimeConfig()

const router = useRouter()
const { loginUser } = useAuthStore()

const loading = ref(false)
const loginData = reactive({ email: '', password: '' })

const rules: Rules = reactive({
  email: {
    name: 'required',
    test: (value: string) => value.length > 0 && /\S+@\S+\.\S+/.test(value?.toLowerCase()),
    message: 'Email must be valid',
  },
  password: [
    {
      name: 'required',
      test: (value: string) => value.length > 0,
      message: 'Password must not be empty.',
    },
    {
      name: 'required',
      test: (value: string) => value.length >= 6,
      message: 'Password must be atleast 6 characters long.',
    },
  ],
})

const { result } = useValidate(loginData, rules)

const login = async () => {
  result.value.$test()

  if (result.value.$invalid) return

  loading.value = true

  const { error } = await loginUser(loginData.email, loginData.password)

  if (error) {
    loading.value = false
    return createToast('Invalid credentials', { type: 'error', timeout: 3000 })
  } else {
    loading.value = false
    router.push('/dashboard')
  }
}

const githubLogin = () => {
  const clientId = githubClientId
  const scopes = ['read:user', 'user:email']
  const allowSignup = true

  const params = new URLSearchParams({
    client_id: clientId,
    scope: scopes.join(' '),
    allow_signup: allowSignup.toString(),
  })

  const loginUrl = `https://github.com/login/oauth/authorize?${params.toString()}}`

  return navigateTo(loginUrl, { external: true })
}
</script>

<template>
  <section class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
    <!-- Inner container  -->
    <div class="flex h-fit w-full max-w-xl flex-col rounded-lg dark:border-gray-700 lg:flex-row">
      <!-- Login Form  -->
      <div class="flex w-full flex-col items-center justify-center space-y-6 px-6 md:p-10 xl:p-14">
        <h1 class="mb-4 text-2xl font-medium tracking-wide dark:text-gray-200 xl:text-3xl">
          Log in
        </h1>
        <div
          class="flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0"
        >
          <primary-button
            class="py-3 hover:bg-gray-700 hover:text-white md:text-base"
            @click="githubLogin"
          >
            Sign up with Github
          </primary-button>
          <!-- <base-button
            class="bg-red-500 py-3 hover:border-red-600 hover:bg-red-600 hover:text-white"
          >
            Sign up with Google
          </base-button> -->
        </div>

        <div class="flex w-full justify-center border-b">
          <p
            class="inline-block translate-y-2 transform bg-white px-2 text-sm font-medium leading-none tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-200"
          >
            Or Log in with an e-mail
          </p>
        </div>

        <form class="flex w-full flex-col items-center space-y-8">
          <div class="w-full space-y-4">
            <text-input
              v-model="loginData.email"
              label="Email"
              type="email"
              placeholder="john@doe.com"
              suffix-icon="ph:at"
              :errors="result.email.$messages"
            />
            <password-input
              v-model="loginData.password"
              label="Password"
              placeholder="********"
              :errors="result.password.$messages"
            />
          </div>

          <primary-button :loading="loading" @click="login"> Log in </primary-button>
        </form>

        <div class="space-y-3">
          <p class="text-center text-gray-600">
            Don't have an account?
            <nuxt-link to="/auth/register" class="text-red-500 hover:underline">Sign up</nuxt-link>
          </p>
          <p class="text-center text-gray-600">
            <nuxt-link to="/auth/forgot-password" class="text-red-500 hover:underline">
              Forgot password?
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
