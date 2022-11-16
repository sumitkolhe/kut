export const useToken = () => {
  const accessTokenCookie = useCookie('accessToken')
  const refreshTokenCookie = useCookie('refreshToken')

  const accessToken = useState('accessToken', () => accessTokenCookie.value)
  const refreshToken = useState('refreshToken', () => refreshTokenCookie.value)

  watch(
    accessToken,
    () => {
      accessTokenCookie.value = accessToken.value
    },
    { deep: true }
  )

  watch(
    refreshToken,
    () => {
      refreshTokenCookie.value = refreshToken.value
    },
    { deep: true }
  )

  return { accessToken, refreshToken }
}
