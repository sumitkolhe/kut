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
    class="border-primary-200 dark:border-primary-700 dark:bg-primary-900 sticky top-0 z-30 border-b bg-white px-6"
  >
    <div
      v-if="!$route.params.alias"
      class="no-scrollbar text-primary-400 mx-auto flex h-12 max-w-screen-xl flex-row items-center space-x-8 overflow-x-scroll"
    >
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.name"
        :to="tab.href"
        active-class="border-black dark:border-primary-50 border-b-[2px] text-black dark:text-primary-50"
        class="hover:text-primary-600 hover:dark:text-primary-300 inline-flex h-12 py-4 transition-all duration-200"
      >
        <Icon :name="tab.icon" size="20" class="mr-2" />
        <p class="text-sm">{{ tab.name }}</p>
      </NuxtLink>
    </div>

    <div
      v-else
      class="no-scrollbar text-primary-400 mx-auto flex h-12 max-w-screen-xl flex-row items-center space-x-8 overflow-x-scroll"
    >
      <button @click="$router.push('/dashboard')">
        <Icon name="ph:arrow-circle-left" class="text-primary-400 hover:text-primary-900 mt-1" />
      </button>

      <NuxtLink
        v-for="tab in subTabs"
        :key="tab.name"
        :to="tab.href"
        active-class="border-black dark:border-primary-50 border-b-[2px] text-black dark:text-primary-50"
        class="hover:text-primary-600 hover:dark:text-primary-300 inline-flex h-12 py-4"
      >
        <Icon :name="tab.icon" size="20" class="mr-2" />
        <p class="text-sm">{{ tab.name }}</p>
      </NuxtLink>
    </div>
  </nav>
</template>
