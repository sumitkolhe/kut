<script lang="ts" setup>
definePageMeta({
  middleware: ['auth', 'verify-email'],
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
  <section class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-8 gap-6">
    <div
      v-for="item in overview"
      :key="item.title"
      class="border p-6 space-y-3 w-auto rounded-md bg-white hover:shadow-lg transition-all duration-100 flex justify-between"
    >
      <div class="space-y-4">
        <p class="font-medium text-gray-800 tracking-wide">{{ item.title }}</p>
        <p class="text-2xl tracking-wide">{{ item.value }}</p>
      </div>
      <div class="bg-gray-100 border items-center flex rounded p-3">
        <Icon :name="item.icon" size="32" />
      </div>
    </div>
  </section>
</template>
