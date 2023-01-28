<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
import ProfileMenu from 'components/molecules/menus/profile-menu.vue'
import ThemeSwitch from 'components/molecules/theme-switch.vue'

const { toggleDrawer, isDrawerVisible } = useDrawer()
</script>

<template>
  <header class="w-full bg-gray-50 px-6 dark:bg-gray-900">
    <div class="mx-auto flex h-16 max-w-screen-xl flex-row items-center justify-between">
      <div class="flex items-center space-x-6">
        <nuxt-link class="flex items-center space-x-3" to="/dashboard">
          <logo />
          <p class="text-lg font-medium uppercase dark:text-gray-50">Kut</p>
        </nuxt-link>
      </div>

      <div class="flex space-x-6">
        <theme-switch />
        <profile-menu class="hidden md:block" />

        <div class="md:hidden">
          <icon
            v-if="!isDrawerVisible"
            name="line-md:menu"
            class="dark:text-gray-50"
            size="24"
            @click="toggleDrawer()"
          />
          <icon
            v-else
            name="line-md:close"
            size="24"
            class="dark:text-gray-50"
            @click="toggleDrawer()"
          />
        </div>
      </div>
    </div>
  </header>
</template>
