<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useLinkStore } from 'store/link.store'

definePageMeta({
  middleware: ['auth'],
})

const { fetchOverviewStats } = useLinkStore()
const { overviewStats } = storeToRefs(useLinkStore())

onMounted(() => fetchOverviewStats())

const stats = computed(() => {
  if (overviewStats.value) {
    return Object?.keys(overviewStats.value).map((s) => {
      return {
        title: s,
        value: overviewStats.value[s],
        icon: 'ph:link-break-duotone',
      }
    })
  } else {
    return []
  }
})
</script>

<template>
  <section class="my-6 grid grid-cols-1 gap-6 md:my-8 md:grid-cols-3 lg:grid-cols-4">
    <div
      v-for="item in stats"
      :key="item.title"
      class="flex w-auto flex-row items-center justify-between rounded-md border bg-white p-6 transition-all duration-100 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 hover:dark:border-gray-50"
    >
      <div class="space-y-4">
        <p class="font-medium text-gray-800 dark:text-gray-200">{{ item.title }}</p>
        <p class="text-2xl font-medium dark:text-gray-200">{{ item.value }}</p>
      </div>
      <div
        class="flex items-center rounded-full border-[2px] bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-900"
      >
        <Icon :name="item.icon" size="32" class="dark:text-gray-600" />
      </div>
    </div>
  </section>
</template>
