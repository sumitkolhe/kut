<script lang="ts" setup>
import AppHeader from 'components/organisms/app-header.vue'
import AppFooter from 'components/organisms/app-footer.vue'
</script>

<template>
  <main>
    <app-header />
    <NuxtLoadingIndicator color="#f55" :height="3" />
    <slot />
    <app-footer />
  </main>
</template>
