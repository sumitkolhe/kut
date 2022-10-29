export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const { $auth } = useNuxtApp()
    const isEmailVerified = computed(() => $auth.user.value.isVerified)

    if (isEmailVerified.value === false) return navigateTo('/auth/verify-email')
  }
})
