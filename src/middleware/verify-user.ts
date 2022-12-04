import type { User } from 'interfaces/user.interface'

export default defineNuxtRouteMiddleware(async () => {
  const { $auth } = useNuxtApp()

  try {
    const user = $auth.$storage.getStore()?.user?.data as User

    const isVerified = user?.isVerified || false

    if (!user) return navigateTo('/')
    else if (user && isVerified === false) return navigateTo('/dashboard/verify')
  } catch (error) {
    if (error instanceof Error) logger.error(error.message)
  }
})
