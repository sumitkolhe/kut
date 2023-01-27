<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useLinkStore } from 'store/link.store'

definePageMeta({
  middleware: ['auth'],
})

const { fetchOverviewStats } = useLinkStore()
const { overviewStats } = storeToRefs(useLinkStore())

onMounted(() => fetchOverviewStats())

const stats = computed(() => [
  {
    title: 'Total Links',
    icon: 'ph:link',
    value: overviewStats.value.totalLinks,
  },
  {
    title: 'Expired Links',
    icon: 'ph:skull',
    value: overviewStats.value.expiredLinks,
  },
  {
    title: 'Disabled Links',
    icon: 'ph:x',
    value: overviewStats.value.disabledLinks,
  },
  {
    title: 'Protected Links',
    icon: 'ph:lock',
    value: overviewStats.value.protectedLinks,
  },
  {
    title: 'Total Visits',
    icon: 'ph:navigation-arrow',
    value: overviewStats.value.totalVisits,
  },
])
</script>

<template>
  <section class="my-6 grid grid-cols-1 gap-6 md:my-8 md:grid-cols-3 lg:grid-cols-4">
    <div
      v-for="stat in stats"
      :key="stat.title"
      class="flex w-auto flex-row items-center justify-between rounded-md border bg-white p-6 shadow-sm transition-all duration-100 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 hover:dark:border-gray-50"
    >
      <div class="space-y-4">
        <p class="font-medium text-gray-800 dark:text-gray-200">{{ stat.title }}</p>
        <p class="text-2xl font-medium dark:text-gray-200">{{ stat.value }}</p>
      </div>
      <div
        class="flex items-center rounded-full border-[2px] bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-900"
      >
        <Icon :name="stat.icon" size="32" class="dark:text-gray-600" />
      </div>
    </div>
  </section>
</template>
