<script setup lang="ts">
const { isDarkTheme, changeTheme } = useTheme()
</script>

<template>
  <div class="relative cursor-pointer">
    <icon
      v-if="!isDarkTheme"
      name="line-md:moon-alt-to-sunny-outline-loop-transition"
      size="24"
      class="text-primary-800 dark:text-primary-300"
      @click="changeTheme"
    />
    <icon
      v-else
      name="line-md:sunny-outline-to-moon-alt-loop-transition"
      size="24"
      class="text-primary-800 dark:text-primary-300"
      @click="changeTheme"
    />
  </div>
</template>
