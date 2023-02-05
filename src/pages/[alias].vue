<script lang="ts" setup>
import { ErrorType } from 'interfaces/error.interface'
import type { CustomResponse } from 'interfaces/response.interface'

definePageMeta({
  layout: 'public',
  auth: 'guest',
})

const route = useRoute()
const headers = useRequestHeaders()
const userAgent = headers?.['user-agent'] ?? navigator.userAgent

const { data, error } = await useFetch<CustomResponse<null>>(
  `/api/v1/links/redirect/${route.params.alias}`,
  {
    method: 'POST',
    headers: {
      'user-agent': userAgent,
    },
  }
)

if (!error.value && data.value?.data) {
  navigateTo(data.value?.data, { redirectCode: 301 })
} else if (error?.value?.data.message === ErrorType.linkNotFound) {
  throw createError({ statusCode: 404, statusMessage: 'Link does not exist' })
} else if (
  error.value?.data.message === ErrorType.linkInactive ||
  error.value?.data.message === ErrorType.linkViewLimitReached
) {
  throw createError({ statusCode: 404, statusMessage: 'Link is inactive' })
} else if (error.value?.data.message === ErrorType.linkPasswordProtected) {
  navigateTo(`/protected/${route.params.alias}`, { redirectCode: 301 })
} else {
  navigateTo('/', { redirectCode: 301 })
}
</script>
