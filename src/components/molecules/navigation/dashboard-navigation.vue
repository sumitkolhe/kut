<script lang="ts" setup>
const route = useRoute()

const alias = computed(() => route.params.alias)

const tabs = computed(() => [
  { name: 'Overview', href: '/dashboard', icon: 'ph:dots-nine-bold' },
  { name: 'Links', href: '/dashboard/links', icon: 'ph:link' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'lucide:settings-2' },
])

const subTabs = computed(() => [
  { name: 'Info', href: `/dashboard/links/${alias.value}/`, icon: 'ph:info' },
  { name: 'Stats', href: `/dashboard/links/${alias.value}/stats`, icon: 'ph:chart-bar' },
])

const { y } = useWindowScroll()
</script>

<template>
  <nav
    ref="element"
    :class="[y >= 60 ? 'shadow transition-all duration-200' : '']"
    class="sticky top-0 z-50 border-b border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-900"
  >
    <div
      v-if="!$route.params.alias"
      class="no-scrollbar mx-auto flex h-12 max-w-screen-xl flex-row items-center space-x-8 overflow-x-scroll text-gray-400"
    >
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.name"
        :to="tab.href"
        active-class="border-black dark:border-gray-50 border-b-[2px] text-black dark:text-gray-50"
        class="inline-flex h-12 py-4 transition-all duration-200 hover:text-gray-600 hover:dark:text-gray-300"
      >
        <Icon :name="tab.icon" size="20" class="mr-2" />
        <p class="text-sm">{{ tab.name }}</p>
      </NuxtLink>
    </div>

    <div
      v-else
      class="no-scrollbar text-gray-00 mx-auto flex h-12 max-w-screen-xl flex-row items-center space-x-8 overflow-x-scroll"
    >
      <button @click="$router.push('/dashboard/links')">
        <Icon name="ph:arrow-circle-left" class="mt-1 text-gray-400 hover:text-gray-900" />
      </button>

      <NuxtLink
        v-for="tab in subTabs"
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
