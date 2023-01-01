<script lang="ts" setup>
definePageMeta({
  middleware: ['verify-user', 'auth'],
})
</script>

<template>
  <section class="my-6 grid grid-cols-1 gap-6 md:my-8 md:grid-cols-3 lg:grid-cols-4">Stats</section>
</template>
