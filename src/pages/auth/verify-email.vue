<script lang="ts" setup>
import PrimaryButton from 'components/atoms/button/primary-button.vue'
import { useAuthStore } from 'store/auth.store'

definePageMeta({
  layout: 'public',
  auth: 'guest',
  middleware: (to) => {
    const verificationToken = to.query.token?.toString()

    if (!verificationToken) return navigateTo('/')
  },
})

const route = useRoute()
const { verifyEmail } = useAuthStore()

const verificationToken = computed(() => route.query.token?.toString())
const loading = ref(false)
const verified = ref()

onMounted(async () => {
  loading.value = true
  const { error } = await verifyEmail(verificationToken.value!)

  if (error) {
    loading.value = false
    verified.value = false
  } else {
    loading.value = false
    verified.value = true
  }
})
</script>

<template>
  <section class="bg-primary-100 dark:bg-primary-800 flex min-h-screen items-center justify-center">
    <div v-if="loading" class="flex flex-col items-center justify-center space-y-4">
      <icon name="line-md:loading-twotone-loop" size="44" />
      <p class="dark:text-primary-200 text-xl font-medium tracking-wide md:text-2xl xl:text-3xl">
        Verifying your email address
      </p>
    </div>

    <div v-else>
      <div v-if="!verified" class="flex flex-col items-center justify-center space-y-6">
        <icon name="line-md:close-circle-twotone" class="text-red-500" size="64" />
        <div class="flex flex-col items-center space-y-2">
          <p
            class="dark:text-primary-200 text-xl font-medium tracking-wide md:text-2xl xl:text-3xl"
          >
            Verification Failed
          </p>
          <p>Please try resending the verification email</p>
        </div>
      </div>

      <div v-else-if="verified" class="flex flex-col items-center justify-center space-y-6">
        <icon name="line-md:confirm-circle-twotone" class="text-green-500" size="64" />
        <p class="dark:text-primary-200 text-xl font-medium tracking-wide md:text-2xl">
          Your email is now verified
        </p>
        <nuxt-link to="/auth/login">
          <primary-button>Go to login page</primary-button>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
