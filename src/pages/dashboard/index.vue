<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})

const { $auth } = useNuxtApp()

const user = computed(() => $auth.user)
</script>

<template>
  <div class="p-6">
    <p>Protected page</p>
    <button @click="$auth.fetchUser()">fetch user</button>
    <button class="block border border-red-500" @click="$auth.logout()">logout</button>
    <!-- <NuxtLink to="/">Go to public page</NuxtLink> -->

    <p>{{ user }}</p>
  </div>
</template>
