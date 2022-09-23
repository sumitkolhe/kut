import type { CustomResponse } from 'interfaces/response.interface'

export default defineNuxtRouteMiddleware(async () => {
  const route = useRoute()

  try {
    if (!route.params.alias) return await navigateTo('/')

    const link = await useRequest<CustomResponse<null>>(`/link/${route.params.alias}`)

    return await navigateTo(link.data, { external: true, redirectCode: 301 })
  } catch {
    return navigateTo('/')
  }
})
