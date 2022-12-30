<script lang="ts" setup>
import type { CustomResponse } from 'interfaces/response.interface'

definePageMeta({
  layout: 'public',
})

const { apiBaseUrl } = useRuntimeConfig()
const route = useRoute()
const headers = useRequestHeaders()
const userAgent = headers?.['user-agent'] ?? navigator.userAgent

const data = await $fetch<CustomResponse<null>>(`${apiBaseUrl}/api/v1/link/${route.params.alias}`, {
  headers: {
    'user-agent': userAgent,
  },
})

navigateTo(data!.data, { external: true, redirectCode: 301 })
</script>

<template>
  <div class="text-xl">
    {{ route.params.alias }}
    <p>Redirection page</p>
  </div>
</template>
