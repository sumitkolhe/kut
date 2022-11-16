export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('slice', (el, binding) => {
    const initial = 0
    const final = binding.value

    el.textContent = `${el.textContent.slice(initial, final)}${
      el.textContent.length > final ? '...' : ''
    }`
  })
})
