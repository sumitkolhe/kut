<script lang="ts" setup>
import { useAuthStore } from 'store/auth.store'

definePageMeta({
  middleware: 'auth',
})

const AuthStore = useAuthStore()
</script>

<template>
  <div class="p-6">
    <p>Protected page</p>
    <!-- <base-button @click="fetchData">logout</base-button> -->
    <!-- <NuxtLink to="/">Go to public page</NuxtLink> -->
  </div>
</template>
