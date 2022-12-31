<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useAuthStore } from 'store/auth.store'

const { logout } = useAuthStore()
</script>

<template>
  <Menu as="div" class="relative z-40 inline-block text-left">
    <div>
      <MenuButton class="dark:text-gray-200">
        <Icon name="ph:user-circle-duotone" size="28" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 z-[60] mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-700 dark:bg-gray-900 dark:ring-gray-700"
      >
        <div class="p-2">
          <MenuItem v-slot="{ active }">
            <NuxtLink
              to="/dashboard/profile"
              :class="[
                active
                  ? 'rounded bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                  : 'text-gray-700 dark:text-gray-500',
                'block px-4 py-2 text-sm',
              ]"
              active-class=""
            >
              Profile
            </NuxtLink>
          </MenuItem>
        </div>

        <div class="p-2">
          <MenuItem v-slot="{ active }">
            <button
              type="button"
              :class="[
                active
                  ? 'rounded bg-red-200 text-red-900 dark:bg-red-500 dark:bg-opacity-20 dark:text-red-600'
                  : 'text-red-400 dark:text-red-500',
                'block w-full px-4 py-2 text-left text-sm',
              ]"
              @click="logout()"
            >
              Logout
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
