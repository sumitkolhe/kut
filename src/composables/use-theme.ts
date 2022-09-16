import { onMounted, watch } from 'vue'

export const useTheme = () => {
  const isDarkTheme = ref(false)

  onMounted(() => {
    if (typeof window === 'undefined' || !window.localStorage) return
    isDarkTheme.value = localStorage.getItem('isDarkTheme') === 'true'
  })

  watch(isDarkTheme, (pre) => {
    if (typeof window === 'undefined' || !window.localStorage) return
    localStorage.setItem('isDarkTheme', String(pre))
    const root = document.querySelector('html') as HTMLElement
    root.setAttribute('class', isDarkTheme.value ? 'dark' : '')
  })

  const changeTheme = () => {
    if (typeof window === 'undefined' || !window.localStorage) return
    isDarkTheme.value = !isDarkTheme.value
  }

  return {
    changeTheme,
    isDarkTheme,
  }
}
