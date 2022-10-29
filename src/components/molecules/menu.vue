<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const { $auth } = useNuxtApp()
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="w-8 h-8 rounded-full border dark:border-gray-700 border-gray-200 dark:bg-gray-800 bg-white text-sm font-medium text-gray-400 shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        S
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y dark:divide-gray-700 divide-gray-200 rounded-md dark:bg-gray-900 bg-white shadow-lg ring-1 dark:ring-gray-700 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="p-2">
          <MenuItem v-slot="{ active }">
            <a
              href="#"
              :class="[
                active
                  ? 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded'
                  : 'text-gray-700 dark:text-gray-500',
                'block px-4 py-2 text-sm',
              ]"
              >Edit</a
            >
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a
              href="#"
              :class="[
                active
                  ? 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded'
                  : 'text-gray-700 dark:text-gray-500',
                'block px-4 py-2 text-sm',
              ]"
            >
              Duplicate
            </a>
          </MenuItem>
        </div>

        <div class="p-2">
          <MenuItem v-slot="{ active }">
            <button
              type="button"
              :class="[
                active
                  ? 'bg-red-200 text-red-900 dark:bg-red-500 dark:bg-opacity-20 dark:text-red-600 rounded'
                  : 'text-red-400 dark:text-red-500',
                'block px-4 py-2 text-sm w-full text-left',
              ]"
              @click="$auth.logout()"
            >
              Logout
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
