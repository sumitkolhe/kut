<script lang="ts" setup>
definePageMeta({
  middleware: ['auth', 'verify-email'],
})
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-6 md:my-8 gap-6">
    Settings
  </section>
</template>
