<script lang="ts" setup>
import AppHeader from 'components/organisms/app-header.vue'
import AppFooter from 'components/organisms/app-footer.vue'
</script>

<template>
  <main class="no-select">
    <app-header />
    <NuxtLoadingIndicator color="#f55" :height="3" />

    <slot />

    <app-footer />
  </main>
</template>

<style scoped>
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
