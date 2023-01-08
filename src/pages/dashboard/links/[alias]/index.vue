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
    <div
      v-if="link.alias"
      class="grid grid-cols-1 gap-4 md:my-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
    >
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Target</p>
        <p v-slice="25" class="text-lg font-medium">{{ link.target }}</p>
      </div>
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Short Url</p>
        <p class="text-lg font-medium">{{ link.shortUrl }}</p>
      </div>
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Alias</p>
        <p class="text-lg font-medium">{{ link.alias }}</p>
      </div>
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Description</p>
        <p class="text-lg font-medium">{{ link?.description || '-' }}</p>
      </div>
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Total Visits</p>
        <p class="text-lg font-medium">{{ link.visitCount }}</p>
      </div>
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Maximum Visits</p>
        <p class="text-lg font-medium">{{ link.meta?.maxVisits || '-' }}</p>
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
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Created On</p>
        <p class="text-lg font-medium">
          {{ useDateFormat(link.createdAt, 'YYYY-MM-DD HH:mm:ss A').value || '-' }}
        </p>
      </div>
      <div class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg">
        <p class="text-gray-500">Updated On</p>
        <p class="text-lg font-medium">
          {{ useDateFormat(link.updatedAt, 'YYYY-MM-DD HH:mm:ss A').value || '-' }}
        </p>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 md:my-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <div
        v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :key="i"
        class="animate-pulse space-y-3 rounded-md border bg-gray-50 p-6"
      >
        <div class="flex-1 space-y-8 py-1">
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-1 h-3 rounded-full bg-gray-300"></div>
            </div>
          </div>
          <div class="col-span-1 h-3 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  </section>
</template>
