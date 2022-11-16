<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
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
  <section class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-6 md:my-8 gap-6">
    <div
      v-for="item in overview"
      :key="item.title"
      class="border p-6 items-center flex-row w-auto rounded-md hover:dark:border-gray-50 dark:border-gray-700 dark:bg-gray-900 bg-white hover:shadow-lg transition-all duration-100 flex justify-between"
    >
      <div class="space-y-4">
        <p class="font-medium dark:text-gray-200 text-gray-800">{{ item.title }}</p>
        <p class="text-2xl font-medium dark:text-gray-200">{{ item.value }}</p>
      </div>
      <div
        class="dark:bg-gray-900 dark:border-gray-600 bg-gray-100 border-[2px] items-center flex rounded-full p-3"
      >
        <Icon :name="item.icon" size="32" class="dark:text-gray-600" />
      </div>
    </div>
  </section>
</template>
