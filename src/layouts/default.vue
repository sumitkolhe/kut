<script lang="ts" setup>
import Navigation from 'components/molecules/navigation.vue'
import AppFooter from 'components/organisms/app-footer.vue'
import Drawer from 'components/molecules/drawer.vue'
import DashboardHeader from 'components/organisms/dashboard-header.vue'

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <main>
    <NuxtLoadingIndicator color="#f55" :height="3" />
    <dashboard-header />
    <navigation v-if="$route.fullPath.includes('dashboard')" />
    <drawer />
    <div class="h-full max-w-screen-xl px-4 mx-auto xl:px-0">
      <slot />
    </div>
    <app-footer />
  </main>
</template>

<style>
* {
  font-family: 'Inter', sans-serif !important;
}

body {
  @apply bg-gray-100 dark:bg-gray-800;
}

/* Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
