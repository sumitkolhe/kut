<script lang="ts" setup>
const tabs = [
  { name: 'Overview', href: '/dashboard', icon: 'ph:dots-nine-bold' },
  { name: 'Links', href: '/dashboard/links', icon: 'ph:link' },
  { name: 'Statistics', href: '/dashboard/stats', icon: 'ph:math-operations-duotone' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'ph:command-duotone' },
]
</script>

<template>
  <nav class="border-b sticky top-0 dark:border-gray-700 border-gray-200 bg-white dark:bg-gray-900">
    <div
      class="max-w-screen-xl px-6 md:px-0 mx-auto flex flex-row space-x-8 text-gray-500 overflow-x-scroll no-scrollbar"
    >
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.name"
        :to="tab.href"
        active-class="border-black dark:border-gray-50 border-b-[2px] text-black dark:text-gray-50"
        class="inline-flex py-4 h-12 hover:text-gray-600 hover:dark:text-gray-300"
      >
        <Icon :name="tab.icon" size="20" class="mr-2" />
        <p class="text-sm">{{ tab.name }}</p>
      </NuxtLink>
    </div>
  </nav>
</template>
