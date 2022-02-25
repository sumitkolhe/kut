<template>
  <v-toolbar flat max-width="1024px" class="mx-auto" color="transparent">
    <v-tabs
      :class="{
        'ml-0': $vuetify.breakpoint.smAndDown,
        '': $vuetify.breakpoint.mdAndUp,
      }"
      color="background"
    >
      <v-tab class="text-none" to="/dashboard">Home</v-tab>
      <v-tab class="text-none" to="/dashboard/link">Links</v-tab>
    </v-tabs>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {},
})
</script>

<style>
.theme--light.v-tabs .v-tab--active:focus::before {
  opacity: 0;
}
.theme--dark.v-tabs .v-tab--active:focus::before {
  opacity: 0;
}
.theme--light.v-tabs .v-tab:hover::before {
  opacity: 0;
}
.theme--dark.v-tabs .v-tab:hover::before {
  opacity: 0;
}
.v-ripple__container {
  display: none !important;
}
</style>
