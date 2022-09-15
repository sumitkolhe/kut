import { onMounted, watch } from 'vue'

export type Theme = 'light' | 'dark'

export const useTheme = () => {
  const isDarkTheme = ref(false)

  onMounted(() => {
    if (typeof window === 'undefined' || !window.localStorage) return
    isDarkTheme.value = localStorage.getItem('isDarkTheme') === 'true'
  })

  watch(isDarkTheme, (pre) => {
    if (typeof window === 'undefined' || !window.localStorage) return
    localStorage.setItem('theme', String(pre))
    const root = document.querySelector('body') as HTMLElement
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
