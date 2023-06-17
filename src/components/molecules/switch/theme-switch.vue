<script setup lang="ts">
const { isDarkTheme, changeTheme } = useTheme()
</script>

<template>
  <div class="relative cursor-pointer">
    <Icon
      v-if="!isDarkTheme"
      name="line-md:moon-alt-to-sunny-outline-loop-transition"
      size="24"
      class="text-primary-800 dark:text-primary-300"
      @click="changeTheme"
    />
    <Icon
      v-else
      name="line-md:sunny-outline-to-moon-alt-loop-transition"
      size="24"
      class="text-primary-800 dark:text-primary-300"
      @click="changeTheme"
    />
  </div>
</template>
