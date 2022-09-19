<script lang="ts" setup>
import { useAuthStore } from 'store/auth.store'
definePageMeta({
  middleware: 'auth',
})

const AuthStore = useAuthStore()

const user = computed(() => AuthStore.user)
</script>

<template>
  <div class="p-6">
    <p>Protected page</p>
    <button @click="AuthStore.fetchUser()">fetch user</button>
    <button class="block border border-red-500" @click="AuthStore.logout()">logout</button>
    <!-- <NuxtLink to="/">Go to public page</NuxtLink> -->

    <p>{{ user }}</p>
  </div>
</template>
