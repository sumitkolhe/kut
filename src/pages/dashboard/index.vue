<script lang="ts" setup>
definePageMeta({
  middleware: ['verify-user'],
})

const overview = [
  {
    title: 'Total Links',
    value: '56',
    icon: 'ph:link-break-duotone',
  },
  {
    title: 'Total Visits',
    value: '230',
    icon: 'ph:navigation-arrow-duotone',
  },
  {
    title: 'Protected Links',
    value: '6',
    icon: 'ph:lock-simple-duotone',
  },
  {
    title: 'Total Tags',
    value: '5',
    icon: 'ph:tag-duotone',
  },
]
</script>

<template>
  <section class="my-6 grid grid-cols-1 gap-6 md:my-8 md:grid-cols-3 lg:grid-cols-4">
    <div
      v-for="item in overview"
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
