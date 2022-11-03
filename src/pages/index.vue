<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
})

const l = ref(false)
</script>

<template>
  <div
    class="flex flex-col min-h-screen p-32 px-6 space-y-6 overflow-hidden bg-white dark:bg-black"
  >
    <AtomsButtonsSecondaryButton
      :loading="l"
      prefix-icon="ph:x"
      suffix-icon="ph:airplane-in-flight"
    >
      hello world
    </AtomsButtonsSecondaryButton>

    <AtomsButtonsSecondaryButton @click="l = !l">Upload</AtomsButtonsSecondaryButton>
  </div>
</template>
