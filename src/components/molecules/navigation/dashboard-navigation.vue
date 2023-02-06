<script lang="ts" setup>
const route = useRoute()

const alias = computed(() => route.params.alias)

const tabs = computed(() => [
  { name: 'Links', href: '/dashboard', icon: 'ph:link' },
  { name: 'Stats', href: '/dashboard/stats', icon: 'ph:dots-nine-bold' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'lucide:settings-2' },
])

const subTabs = computed(() => [
  { name: 'Info', href: `/dashboard/${alias.value}/`, icon: 'ph:info' },
  { name: 'Stats', href: `/dashboard/${alias.value}/stats`, icon: 'ph:chart-bar' },
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
      class="no-scrollbar mx-auto flex h-12 max-w-screen-xl flex-row items-center space-x-8 overflow-x-scroll text-gray-400"
    >
      <button @click="$router.push('/dashboard')">
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
