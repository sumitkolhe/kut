<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="text-xl">
    <p>Protected page</p>

    <NuxtLink to="/">Go to public page</NuxtLink>
  </div>
</template>
