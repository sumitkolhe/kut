export const useTheme = () => {
  const colorMode = useColorMode()

  const isDarkTheme = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    },
  })

  const changeTheme = () => {
    isDarkTheme.value = !isDarkTheme.value
  }

  return {
    changeTheme,
    isDarkTheme,
  }
}
