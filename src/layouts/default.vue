<script lang="ts" setup>
import Navigation from 'components/molecules/navigation.vue'
import Footer from 'components/organisms/footer.vue'
import Header from 'components/organisms/header.vue'
import Drawer from 'components/molecules/drawer.vue'

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <main>
    <NuxtLoadingIndicator color="#f55" :height="4" />
    <Header />

    <Navigation />
    <Drawer />
    <div class="max-w-screen-xl mx-auto md:px-0 px-6 h-screen">
      <slot />
    </div>
    <Footer />
  </main>
</template>

<style>
* {
  font-family: 'Inter', sans-serif !important;
}

body {
  @apply bg-gray-50 dark:bg-gray-800;
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
