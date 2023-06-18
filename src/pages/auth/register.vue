<script lang="ts" setup>
import PrimaryButton from 'components/atoms/button/primary-button.vue'
import TextInput from 'components/atoms/input/text-input.vue'
import useValidate from 'vue-tiny-validate'
import { useAuthStore } from 'store/auth.store'
import PasswordInput from 'components/atoms/input/password-input.vue'
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

const { result } = useValidate(registerData, rules)

const register = async () => {
  result.value.$test()

  if (result.value.$invalid) return

  loading.value = true
  const { error } = await registerUser(registerData.email, registerData.password)

  if (error) {
    loading.value = false
    createToast(error, { type: 'error', timeout: 3000 })
  } else {
    createToast('User registered successfully, redirecting...', {
      type: 'success',
      timeout: 2000,
    })
    loading.value = false

    setTimeout(() => {
      const router = useRouter()
      router.push('/auth/login')
    }, 2000)
  }
}

const signUpWithGithub = () => {
  const loginUrl = `https://github.com/login/oauth/authorize?client_id=19a5d1e1b27c48cd21c7&redirect_uri=http://localhost:3000/auth/github&scope=read:user%20user:email&allow_signup=true`

  return navigateTo(loginUrl, { external: true })
}
</script>

<template>
  <section class="bg-primary-100 dark:bg-primary-800 flex min-h-screen items-center justify-center">
    <!-- Inner container  -->
    <div class="dark:border-primary-700 flex h-fit w-full max-w-xl flex-col rounded-lg lg:flex-row">
      <!-- Register Form  -->
      <div class="flex w-full flex-col items-center justify-center space-y-8 px-6 md:p-10 xl:p-14">
        <h1 class="dark:text-primary-200 mb-4 text-2xl font-medium tracking-wide xl:text-3xl">
          Create Account
        </h1>
        <div
          class="flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-x-8 md:space-y-0"
        >
          <primary-button
            prefix-icon="ph:github-logo"
            class="hover:bg-primary-700 py-3 hover:text-white"
            @click="signUpWithGithub"
          >
            Sign up with Github
          </primary-button>
          <primary-button
            prefix-icon="ph:google-logo"
            class="border-red-500 bg-red-500 py-3 hover:border-red-600 hover:bg-red-600 hover:text-white"
          >
            Sign up with Google
          </primary-button>
        </div>

        <div class="flex w-full justify-center border-b">
          <p
            class="bg-primary-50 text-primary-600 dark:bg-primary-800 dark:text-primary-300 inline-block translate-y-2 transform px-2 text-sm font-medium leading-none tracking-wide"
          >
            Or sign up with an e-mail
          </p>
        </div>

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

          <primary-button :loading="loading" @click="register"> Sign Up </primary-button>
        </form>
        <p class="text-primary-600 text-center">
          Already have an account?
          <nuxt-link to="/auth/login" class="text-red-500 hover:underline">Log in</nuxt-link>
        </p>
      </div>
    </div>
  </section>
</template>
