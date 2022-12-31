<script lang="ts" setup>
const tabs = [
  { name: 'Overview', href: '/dashboard', icon: 'ph:dots-nine-bold' },
  { name: 'Links', href: '/dashboard/links', icon: 'ph:link' },
  {
    name: 'Statistics',
    href: '/dashboard/stats',
    icon: 'ph:graph',
  },
  { name: 'Settings', href: '/dashboard/settings', icon: 'lucide:settings-2' },
]
</script>

<template>
  <nav
    class="sticky top-0 z-50 border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900"
  >
    <div
      class="no-scrollbar mx-auto flex h-12 max-w-screen-xl flex-row space-x-8 overflow-x-scroll text-gray-500"
    >
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.name"
        :to="tab.href"
        active-class="border-black dark:border-gray-50 border-b-[2px] text-black dark:text-gray-50"
        class="inline-flex h-12 py-4 hover:text-gray-600 hover:dark:text-gray-300"
      >
        <Icon :name="tab.icon" size="20" class="mr-2" />
        <p class="text-sm">{{ tab.name }}</p>
      </NuxtLink>
    </div>
  </nav>
</template>
