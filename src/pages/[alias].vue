<script lang="ts" setup>
import type { CustomResponse } from 'interfaces/response.interface'

definePageMeta({
  layout: 'public',
})

const { apiBaseUrl } = useRuntimeConfig()
const route = useRoute()
const headers = useRequestHeaders()
const userAgent = headers?.['user-agent'] ?? navigator.userAgent

const { data } = await useFetch<CustomResponse<null>>(
  `${apiBaseUrl}/api/v1/link/${route.params.alias}`,
  {
    headers: {
      'user-agent': userAgent,
    },
  }
)

if (!data.value?.data || data.value.data === '') {
  throw createError({ statusCode: 404, statusMessage: 'Link does not exist' })
} else navigateTo(data.value.data, { external: true, redirectCode: 301 })
</script>

<template>
  <div class="text-xl">
    <p>Redirecting...</p>
  </div>
</template>
