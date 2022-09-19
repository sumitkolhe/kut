export default defineNuxtPlugin(() => {
  const cookie = useCookie('accessToken')

  if (!cookie.value) return

  useState<string>('accessToken').value = cookie.value
})
