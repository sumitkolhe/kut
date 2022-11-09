<script lang="ts" setup>
import Menu from 'components/molecules/menu.vue'

const { toggleDrawer, isDrawerVisible } = useDrawer()
</script>

<template>
  <header class="bg-white dark:bg-gray-900 w-full py-3 px-4">
    <div class="max-w-screen-xl mx-auto flex flex-row justify-between items-center">
      <NuxtLink class="flex items-center space-x-3" to="/dashboard">
        <Icon name="gridicons:link" size="36" class="text-red-500" />
        <p class="font-medium uppercase text-lg dark:text-gray-50">Kut</p>
      </NuxtLink>

      <div class="hidden md:block">
        <Menu />
      </div>
      <div class="md:hidden">
        <Icon
          v-if="!isDrawerVisible"
          name="line-md:menu"
          class="dark:text-gray-50"
          size="24"
          @click="toggleDrawer()"
        />
        <Icon
          v-else
          name="line-md:close"
          size="24"
          class="dark:text-gray-50"
          @click="toggleDrawer()"
        />
      </div>
    </div>
  </header>
</template>
