export const useTheme = () => {
  const colorMode = useColorMode()
  const isDarkTheme = ref()

  const changeTheme = () => {
    colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
    isDarkTheme.value = colorMode.preference === 'dark'
  }

  return {
    changeTheme,
    isDarkTheme,
  }
}
