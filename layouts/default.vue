<template>
  <v-app dark>
    <Navigation />
    <nuxt />
  </v-app>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: 'auth',
})
</script>

<style>
</style>
