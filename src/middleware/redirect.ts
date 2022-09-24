import type { CustomResponse } from 'interfaces/response.interface'

export default defineNuxtRouteMiddleware(async () => {
  const route = useRoute()
  const config = useRuntimeConfig()

  const baseURL = config.apiBaseUrl

  try {
    if (!route.params.alias) return await navigateTo('/')

    const link = await useRequest<CustomResponse<null>>(`${baseURL}/link/${route.params.alias}`)

    return await navigateTo(link.data, { external: true, redirectCode: 301 })
  } catch {
    return navigateTo('/')
  }
})
