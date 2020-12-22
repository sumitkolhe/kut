<template>
  <div class="text-center ma-2">
    <v-btn dark @click="snackbar = true"> Open Snackbar </v-btn>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
    snackbar: false,
    text: `Hello, I'm a snackbar`,
  }),
})
</script>