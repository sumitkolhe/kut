import type { CustomResponse } from 'interfaces/response.interface'

export default defineNuxtRouteMiddleware(async () => {
  try {
    const route = useRoute()

    const link = await useApi<CustomResponse<null>>(`/link/${route.params.alias}`)

    console.log(link)

    return await navigateTo(link.data, { external: true, redirectCode: 301 })
  } catch {
    return navigateTo('/')
  }
})
