export default defineNuxtRouteMiddleware(async () => {
  // const { $auth } = useNuxtApp()
  // const router = useRouter()

  // try {
  //   const user = $auth.$storage.getStore()?.user?.data as User

  //   const isVerified = user?.isVerified || false

  //   if (!user) return router.replace('/')
  //   else if (user && isVerified === false) return router.replace('/dashboard/verify')
  // } catch (error) {
  //   if (error instanceof Error) logger.error(error.message)
  // }

  return
})
