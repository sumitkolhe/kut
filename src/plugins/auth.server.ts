export default defineNuxtPlugin(() => {
  const { accessToken, refreshToken } = useToken()

  if (!accessToken.value || !refreshToken.value) return
})
