<template>
  <v-app-bar>
    <h2>{{ appTitle }}</h2>
    <v-spacer></v-spacer>

    <v-btn icon large><v-icon> mdi-bell-ring-outline </v-icon></v-btn>

    <v-btn icon large><v-icon> mdi-account-circle-outline </v-icon></v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return { appTitle: 'Reduced' }
  },
})
</script>
<style>
</style>