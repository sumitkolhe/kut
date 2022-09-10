<script lang="ts" setup>
const ctx = useNuxtApp()

const logout = () => {
  ctx.$auth.logout()
}
</script>

<template>
  <div class="text-xl">
    hello

    <button @click="logout">logout</button>
  </div>
</template>
