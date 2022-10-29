<script lang="ts" setup>
definePageMeta({
  middleware: ['auth', 'verify-email'],
})
</script>

<template>
  <div class="p-6">
    <p>Links</p>
  </div>
</template>
