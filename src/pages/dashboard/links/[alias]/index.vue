<script lang="ts" setup>
import { useLinkStore } from 'store/link.store'
import { storeToRefs } from 'pinia'

definePageMeta({
  middleware: ['auth'],
  layout: 'links',
})

const route = useRoute()

const { fetchLinkByAlias } = useLinkStore()
const { link } = storeToRefs(useLinkStore())

onMounted(() => fetchLinkByAlias(route.params.alias as string))
</script>

<template>
  <section class="my-6">
    <div class="grid grid-cols-1 gap-4 md:my-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Target</p>
        <p class="text-lg font-medium">{{ link.target }}</p>
      </div>
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Short Url</p>
        <p class="text-lg font-medium">{{ link.shortUrl }}</p>
      </div>
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Description</p>
        <p class="text-lg font-medium">{{ link.description }}</p>
      </div>
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Total Visits</p>
        <p class="text-lg font-medium">{{ link.visitCount }}</p>
      </div>
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Valid From</p>
        <p class="text-lg font-medium">
          {{ useDateFormat(link.meta?.validFrom, 'YYYY-MM-DD HH:mm:ss A').value || '-' }}
        </p>
      </div>
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Expiry Date</p>
        <p class="text-lg font-medium">
          {{
            link.meta?.validTill
              ? useDateFormat(link.meta?.validTill, 'YYYY-MM-DD HH:mm:ss A').value
              : '-'
          }}
        </p>
      </div>
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Password Protected</p>
        <p class="text-lg font-medium">{{ link.meta?.password || '-' }}</p>
      </div>
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Active</p>
        <p class="text-lg font-medium capitalize">{{ link.meta?.active || '-' }}</p>
      </div>
    </div>
  </section>
</template>
