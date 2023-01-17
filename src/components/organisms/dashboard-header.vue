<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
import ProfileMenu from 'components/molecules/menus/profile-menu.vue'

const { toggleDrawer, isDrawerVisible } = useDrawer()
</script>

<template>
  <header class="w-full bg-gray-50 px-4 dark:bg-gray-900">
    <div class="mx-auto flex h-16 max-w-screen-xl flex-row items-center justify-between">
      <div class="flex items-center space-x-6">
        <NuxtLink class="flex items-center space-x-3" to="/dashboard">
          <Logo />
          <p class="text-lg font-medium uppercase dark:text-gray-50">Kut</p>
        </NuxtLink>
      </div>

      <div class="hidden md:block">
        <profile-menu />
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
