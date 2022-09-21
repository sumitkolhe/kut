export default defineNuxtPlugin(() => {
  const accessToken = useCookie('accessToken')
  const refreshToken = useCookie('refreshToken')

  if (!accessToken.value) return

  useState<string>('accessToken').value = accessToken.value
  useState<string>('refreshToken').value = refreshToken.value
})
