<script lang="ts" setup>
import { useAuthStore } from 'store/auth.store'

definePageMeta({
  layout: false,
  auth: 'guest',
})

const route = useRoute()
const loading = ref(false)
const { loginWithGithub } = useAuthStore()

onMounted(async () => {
  loading.value = true
  const { error } = await loginWithGithub(route.query.code as string)

  if (error) {
    return createToast(error, { type: 'error', timeout: 3000 })
  }

  createToast('User registered successfully, redirecting...', {
    type: 'success',
    timeout: 2000,
  })

  setTimeout(() => {
    loading.value = false
    const router = useRouter()
    router.push('/dashboard')
  }, 1500)
})
</script>

<template>
  <section class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
    <div v-if="loading" class="flex flex-col items-center justify-center space-y-4">
      <icon name="line-md:loading-twotone-loop" size="44" />
      <p class="text-xl font-medium tracking-wide dark:text-gray-200 md:text-2xl xl:text-3xl">
        Please wait...
      </p>
    </div>
  </section>
</template>
