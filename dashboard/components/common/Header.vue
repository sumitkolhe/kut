<template>
  <v-app-bar
    class="mx-auto"
    max-width="1024px"
    height="80px"
    color="transparent"
    app
    flat
  >
    <v-icon color="background" left large>mdi-content-cut</v-icon>
    <h2 class="font-weight-bold">Small</h2>
    <v-spacer></v-spacer>
    <v-icon v-if="$auth.loggedIn" large color="background"
      >mdi-account-circle</v-icon
    >

    <div v-if="!$auth.loggedIn">
      <v-spacer></v-spacer>
      <v-btn class="text-none mr-4" text to="/auth/login">Login</v-btn>
      <v-btn
        class="text-none foreground--text"
        depressed
        to="/auth/register"
        color="background"
        >Signup</v-btn
      >
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({})
</script>
