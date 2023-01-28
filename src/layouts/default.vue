<script lang="ts" setup>
import AppFooter from 'components/organisms/app-footer.vue'
import DashboardDrawer from 'components/organisms/dashboard-drawer.vue'
import DashboardHeader from 'components/organisms/dashboard-header.vue'
import DashboardNavigation from 'components/molecules/navigation/dashboard-navigation.vue'
import CommandBar from 'components/organisms/command-bar.vue'

const { isDrawerVisible } = useDrawer()
</script>

<template>
  <main class="no-select" :class="[isDrawerVisible ? 'fixed w-full' : '']">
    <NuxtLoadingIndicator color="#f55" :height="4" />
    <dashboard-header />
    <dashboard-navigation />
    <dashboard-drawer />
    <command-bar />
    <div class="mx-auto max-w-screen-xl px-6 lg:-mb-36 xl:px-0">
      <slot />
    </div>
    <app-footer class="hidden lg:block" />
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
