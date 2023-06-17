<script lang="ts" setup>
const { toggleDrawer, isDrawerVisible } = useDrawer()
</script>

<template>
  <div class="cursor-pointer md:hidden">
    <icon
      v-if="!isDrawerVisible"
      name="line-md:close-to-menu-alt-transition"
      class="dark:text-primary-300"
      size="24"
      @click="toggleDrawer()"
    />
    <icon
      v-else
      name="line-md:menu-to-close-alt-transition"
      size="24"
      class="dark:text-primary-300"
      @click="toggleDrawer()"
    />
  </div>
</template>
