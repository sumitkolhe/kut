<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
import ProfileMenu from 'components/molecules/menus/profile-menu.vue'
import ThemeSwitch from 'components/molecules/theme-switch.vue'
import DrawerSwitch from 'components/molecules/drawer-switch.vue'
import { useAuthStore } from 'store/auth.store'

const { fetchUser } = useAuthStore()

onMounted(() => fetchUser())
</script>

<template>
  <header class="w-full bg-gray-50 px-6 dark:bg-gray-900">
    <div class="mx-auto flex h-16 max-w-screen-xl flex-row items-center justify-between">
      <div class="flex items-center space-x-6">
        <nuxt-link class="flex items-center space-x-3" to="/dashboard">
          <logo />
        </nuxt-link>
      </div>

      <div class="flex space-x-6">
        <theme-switch />
        <profile-menu class="hidden md:block" />
        <drawer-switch />
      </div>
    </div>
  </header>
</template>
