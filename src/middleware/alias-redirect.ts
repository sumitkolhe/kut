import type { CustomResponse } from 'interfaces/response.interface'

export default defineNuxtRouteMiddleware(async () => {
  const route = useRoute()
  const config = useRuntimeConfig()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const nuxtApp = useNuxtApp()

  const baseURL = config.apiBaseUrl

  let link
  try {
    const headers = useRequestHeaders()
    const userAgent = headers?.['user-agent'] ?? navigator.userAgent

    link = await $fetch<CustomResponse<null>>(`/api/v1/link/${route.params.alias}`, {
      headers: {
        'user-agent': userAgent,
      },
      baseURL,
      method: 'GET',
    })

    return navigateTo(link.data, { external: true, redirectCode: 301 })
  } catch {
    link = null
  }
  if (!link) {
    return navigateTo('/')
  }
})