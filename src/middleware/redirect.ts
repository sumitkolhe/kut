import type { CustomResponse } from 'interfaces/response.interface'

// redirect to external page using alias
export default defineNuxtRouteMiddleware(async () => {
  const route = useRoute()
  const config = useRuntimeConfig()
  const nuxtApp = useNuxtApp()

  const baseURL = config.apiBaseUrl

  let link
  try {
    link = await $fetch<CustomResponse<null>>(`${baseURL}/api/link/${route.params.alias}`)
    return navigateTo(link.data, { external: true, redirectCode: 301 })
  } catch {
    link = null
  }
  if (!link) {
    return navigateTo('/')
  }
})
