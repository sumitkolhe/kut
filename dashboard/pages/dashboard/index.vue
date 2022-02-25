<template>
  <v-row justify="center">
    <v-col cols="6">
      <v-text-field
        v-model="longUrl"
        placeholder="Password"
        required
        outlined
        color="background"
      ></v-text-field>
      <v-btn
        depressed
        color="background"
        :disabled="longUrl === ''"
        class="text-none foreground--text"
        @click="shorten"
      >
        Shorten</v-btn
      >
      {{ response }}
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const longUrl = ref()
    const response = ref()
    const context = useContext()

    const shorten = async () => {
      try {
        response.value = await context.$axios.$post('/shorten', {
          longUrl: longUrl.value,
        })
      } catch (error) {}
    }

    return { longUrl, shorten, response }
  },
})
</script>
