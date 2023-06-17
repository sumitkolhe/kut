<script lang="ts" setup>
import { useAuthStore } from 'store/auth.store'

definePageMeta({
  layout: false,
  auth: 'guest',
})

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const { loginWithGithub } = useAuthStore()

onMounted(async () => {
  loading.value = true
  const { error } = await loginWithGithub(route.query.code as string)

  if (error) {
    createToast(error, { type: 'error', timeout: 3000 })
    return router.push('/')
  }

  setTimeout(() => {
    loading.value = false
    router.push('/dashboard')
  }, 1000)
})
</script>

<template>
  <section class="bg-primary-100 dark:bg-primary-800 flex min-h-screen items-center justify-center">
    <div v-if="loading" class="flex flex-col items-center justify-center space-y-6">
      <div class="flex flex-col items-center justify-center space-y-2">
        <p class="dark:text-primary-200 text-2xl font-medium tracking-wide md:text-3xl xl:text-4xl">
          Authenticating
        </p>
        <p class="text-primary-500 dark:text-primary-400 text-justify text-lg">
          Kut is validating your identity...
        </p>
      </div>

      <icon name="svg-spinners:eclipse" size="44" />
    </div>
  </section>
</template>
