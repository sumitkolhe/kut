<script lang="ts" setup>
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
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
const verified = ref(false)

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
  <section class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
    <div v-if="loading" class="flex flex-col items-center justify-center space-y-4">
      <icon name="line-md:loading-twotone-loop" size="44" />
      <p class="text-xl font-medium tracking-wide dark:text-gray-200 md:text-2xl xl:text-3xl">
        Verifying your email address
      </p>
    </div>

    <div
      v-else-if="!loading && !verified"
      class="flex flex-col items-center justify-center space-y-6"
    >
      <icon name="line-md:close-circle-twotone" class="text-red-500" size="64" />
      <div class="flex flex-col items-center space-y-2">
        <p class="text-xl font-medium tracking-wide dark:text-gray-200 md:text-2xl xl:text-3xl">
          Verification Failed
        </p>
        <p>Please try resending the verification email</p>
      </div>
    </div>

    <div
      v-else-if="!loading && verified"
      class="flex flex-col items-center justify-center space-y-6"
    >
      <icon name="line-md:confirm-circle-twotone" class="text-green-500" size="64" />
      <p class="text-xl font-medium tracking-wide dark:text-gray-200 md:text-2xl">
        Your email is now verified
      </p>
      <primary-button>Go to login page</primary-button>
    </div>
  </section>
</template>
