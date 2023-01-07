<script lang="ts" setup>
import AppFooter from 'components/organisms/app-footer.vue'
import DashboardDrawer from 'components/organisms/dashboard-drawer.vue'
import DashboardHeader from 'components/organisms/dashboard-header.vue'
import LinksNavigation from 'components/molecules/navigation/links-navigation.vue'
</script>

<template>
  <main class="no-select">
    <NuxtLoadingIndicator color="#f55" :height="3" />
    <dashboard-header />
    <links-navigation />
    <dashboard-drawer />
    <div class="mx-auto h-full min-h-screen max-w-screen-xl px-4 lg:-mb-36 xl:px-0">
      <slot />
    </div>
    <app-footer />
  </main>
</template>

<style>
* {
  font-family: 'Inter', sans-serif !important;
}

.no-select {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.no-select:focus {
  outline: none !important;
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
