<script lang="ts" setup>
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
  </main>
</template>

<style>
* {
  font-family: 'Inter', sans-serif !important;
}

.no-select:focus {
  outline: none !important;
}

/* Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

body {
  @apply bg-primary-100 dark:bg-primary-800;
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.2s ease;
}

.fade-in-enter-from {
  opacity: 0;
}
.fade-in-leave-to {
  opacity: 0;
}
</style>
