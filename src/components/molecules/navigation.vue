<script lang="ts" setup>
const tabs = [
  { name: 'Overview', href: '/dashboard', icon: 'ph:dots-nine-bold' },
  { name: 'Links', href: '/dashboard/links', icon: 'ph:link' },
  { name: 'Statistics', href: '/dashboard/stats', icon: 'ph:math-operations-duotone' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'ph:command-duotone' },
]
</script>

<template>
  <nav class="border-b border-gray-200 bg-white">
    <div class="max-w-screen-xl mx-auto">
      <ul class="flex flex-wrap space-x-8 text-sm text-center text-gray-500">
        <NuxtLink
          v-for="tab in tabs"
          :key="tab.name"
          :to="tab.href"
          active-class="border-black border-b-[2px] text-black"
          class="inline-flex py-4 h-12 hover:text-gray-600"
        >
          <Icon :name="tab.icon" size="20" class="mr-2" />
          <p class="text-sm">{{ tab.name }}</p>
        </NuxtLink>
      </ul>
    </div>
  </nav>
</template>
