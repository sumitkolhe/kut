<template>
  <v-app dark>
    <v-main>
      <Navigation />
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: 'auth',
})
</script>

<style>
#app {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}
</style>
