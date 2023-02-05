<script lang="ts" setup>
import { ErrorType } from 'interfaces/error.interface'
import type { CustomResponse } from 'interfaces/response.interface'

definePageMeta({
  layout: 'public',
  auth: 'guest',
})

const {
  public: { apiBaseUrl },
} = useRuntimeConfig()
const route = useRoute()
const headers = useRequestHeaders()
const userAgent = headers?.['user-agent'] ?? navigator.userAgent

const { data, error } = await useFetch<CustomResponse<string>>(
  `${apiBaseUrl}/api/v1/links/redirect/${route.params.alias}`,
  {
    method: 'POST',
    headers: {
      'user-agent': userAgent,
    },
  }
)

if (!error.value && data.value?.data) {
  navigateTo(data.value?.data, { redirectCode: 301, external: true })
} else if (error?.value?.data.message === ErrorType.linkNotFound) {
  throw createError({ statusCode: 404, statusMessage: 'Link does not exist' })
} else if (
  error.value?.data.message === ErrorType.linkInactive ||
  error.value?.data.message === ErrorType.linkViewLimitReached
) {
  throw createError({ statusCode: 404, statusMessage: 'Link is inactive' })
} else if (error.value?.data.message === ErrorType.linkPasswordProtected) {
  navigateTo(`/protected/${route.params.alias}`, { redirectCode: 301, external: true })
} else {
  navigateTo('/', { redirectCode: 301, external: true })
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-gray-900">
    Redirecting...
  </div>
</template>
