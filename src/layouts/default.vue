<script lang="ts" setup>
import Navigation from 'components/molecules/navigation.vue'
import Header from '../components/organisms/header.vue'

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <main>
    <NuxtLoadingIndicator color="#f55" :height="4" />
    <Header />
    <Navigation />
    <div class="max-w-screen-xl mx-auto">
      <slot />
    </div>
  </main>
</template>

<style>
* {
  font-family: 'Inter', sans-serif !important;
}

body {
  @apply bg-gray-50;
}
</style>
