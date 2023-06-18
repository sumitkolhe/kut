<script lang="ts" setup>
import AppHeader from 'components/organisms/app-header.vue'
import AppDrawer from 'components/organisms/app-drawer.vue'
import AppFooter from 'components/organisms/app-footer.vue'
</script>

<template>
  <main class="no-select">
    <app-header />
    <app-drawer />
    <nuxt-loading-indicator color="#f55" :height="30" />
    <slot />
    <app-footer />
  </main>
</template>

<style scoped>
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

body {
  @apply bg-primary-100 dark:bg-primary-900;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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
