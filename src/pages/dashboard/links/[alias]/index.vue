<script lang="ts" setup>
import { useLinkStore } from 'store/link.store'
import { storeToRefs } from 'pinia'

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()

const { fetchLinkByAlias } = useLinkStore()
const { link } = storeToRefs(useLinkStore())

onMounted(() => fetchLinkByAlias(route.params.alias as string))

const linkStats = computed(() => [
  { name: 'Alias', value: link.value.alias },
  { name: 'Short URL', value: link.value.shortUrl },
  { name: 'Description', value: link.value?.description ? link.value.description : '-' },
  { name: 'Target', value: link.value.target },
  { name: 'Visit Count', value: link.value.visitCount },
  {
    name: 'Max Visits',
    value: link.value.meta?.maxVisits
      ? useDateFormat(link.value.meta?.maxVisits, 'YYYY-MM-DD HH:mm:ss A').value
      : '-',
  },
  {
    name: 'Valid From',
    value: link.value.meta?.validFrom
      ? useDateFormat(link.value.meta?.validFrom, 'YYYY-MM-DD HH:mm:ss A').value
      : '-',
  },
  {
    name: 'Expiry',
    value: link.value.meta?.validTill
      ? useDateFormat(link.value.meta?.validTill, 'YYYY-MM-DD HH:mm:ss A').value
      : '-',
  },
  { name: 'Password', value: link.value.meta?.password ? link.value.meta.password : '-' },
  { name: 'Active', value: link.value.meta?.active ? link.value.meta.active : '-' },
  { name: 'Created At', value: useDateFormat(link.value.createdAt, 'YYYY-MM-DD HH:mm:ss A').value },
  {
    name: 'Updated At',
    value: useDateFormat(link.value.updatedAt, 'YYYY-MM-DD HH:mm:ss A').value,
  },
])
</script>

<template>
  <section class="my-6 md:my-8">
    <div v-if="link.alias" class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <div
        v-for="(stat, index) of linkStats"
        :key="index"
        class="space-y-3 rounded-md border bg-gray-50 p-6 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
      >
        <p class="text-gray-500">{{ stat.name }}</p>
        <p v-slice="25" class="text-lg font-medium dark:text-gray-200">
          {{ stat.value }}
        </p>
      </div>
    </div>

    <!-- skeleton loader  -->
    <div v-else class="grid grid-cols-1 gap-4 md:my-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <div
        v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :key="i"
        class="animate-pulse space-y-3 rounded-md border bg-gray-50 p-6"
      >
        <div class="flex-1 space-y-8 py-1">
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-1 h-3 rounded-full bg-gray-200"></div>
            </div>
          </div>
          <div class="col-span-1 h-3 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  </section>
</template>
