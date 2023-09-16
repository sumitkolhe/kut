<script lang="ts" setup>
import useValidate from 'vue-tiny-validate'
import { useAuthStore } from 'store/auth.store'
import type { Rules } from 'vue-tiny-validate'

definePageMeta({
  layout: 'public',
  auth: 'guest',
})

const {
  public: { githubClientId },
} = useRuntimeConfig()

const toast = useToast()
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
      message: 'Password must be at-least 6 characters long.',
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
    toast.add({ title: 'Invalid credentials', description: error, color: 'primary' })
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

  return navigateTo(loginUrl, { external: true, replace: true })
}
</script>

<template>
  <section class="bg-primary-100 dark:bg-primary-900 flex min-h-screen items-center justify-center">
    <!-- Inner container  -->
    <div class="dark:border-primary-700 flex h-fit w-full max-w-xl flex-col rounded-lg lg:flex-row">
      <!-- Login Form  -->
      <div class="flex w-full flex-col items-center justify-center space-y-6 px-6 md:p-10 xl:p-14">
        <h1 class="dark:text-primary-200 mb-4 text-2xl font-medium tracking-wide xl:text-3xl">
          Log in
        </h1>
        <div
          class="flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0"
        >
          <u-button
            size="lg"
            block
            icon="i-tabler-brand-github"
            :trailing="true"
            :loading="loading"
            @click="githubLogin"
          >
            Log in with GitHub
          </u-button>

          <!-- <u-button size="xl" block :loading="loading" @click="login">
            Log in with Google
          </u-button> -->
        </div>

        <div class="flex w-full justify-center border-b">
          <p
            class="bg-primary-50 text-primary-600 dark:bg-primary-800 dark:text-primary-300 inline-block translate-y-2 transform px-2 text-sm font-medium leading-none tracking-wide"
          >
            OR
          </p>
        </div>

        <form class="flex w-full flex-col items-center space-y-8">
          <div class="w-full space-y-4">
            <u-form-group label="Email" :error="result.email.$messages[0]">
              <u-input
                v-model="loginData.email"
                size="xl"
                type="email"
                placeholder="dwight@dundermiflfin.com"
                trailing
                icon="i-tabler-at"
              />
            </u-form-group>

            <u-form-group label="Password" :error="result.password.$messages[0]">
              <u-input
                v-model="loginData.password"
                size="xl"
                type="email"
                placeholder="**********"
                trailing
                icon="i-tabler-password"
              />
            </u-form-group>
          </div>

          <u-button size="lg" block :loading="loading" @click="login"> Log in </u-button>
        </form>

        <div class="space-y-3">
          <p class="text-primary-600 text-center">
            Don't have an account?
            <nuxt-link to="/auth/register" class="text-red-500 hover:underline">Sign up</nuxt-link>
          </p>
          <p class="text-primary-600 text-center">
            <nuxt-link to="/auth/forgot-password" class="text-red-500 hover:underline">
              Forgot password?
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
