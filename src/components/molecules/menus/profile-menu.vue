<script setup lang="ts">
import { MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useAuthStore } from 'store/auth.store'

const { logout } = useAuthStore()
</script>

<template>
  <menu as="div" class="relative z-40 inline-block text-left">
    <div>
      <menu-button class="text-primary-800 dark:text-primary-300">
        <icon name="ph:user-circle" size="28" />
      </menu-button>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <menu-items
        class="divide-primary-200 bg-primary-50 dark:divide-primary-700 dark:bg-primary-900 dark:ring-primary-700 absolute right-0 mt-2 w-56 origin-top-right divide-y rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="p-2">
          <menu-item v-slot="{ active }">
            <nuxt-link
              to="/dashboard/settings"
              :class="[
                active
                  ? 'bg-primary-200 text-primary-900 dark:bg-primary-700 dark:text-primary-100 rounded'
                  : 'text-primary-700 dark:text-primary-200',
                'block px-4 py-2 text-sm',
              ]"
              active-class=""
            >
              Profile
            </nuxt-link>
          </menu-item>
        </div>

        <div class="p-2">
          <menu-item v-slot="{ active }">
            <button
              type="button"
              :class="[
                active
                  ? 'text-primary-50 dark:text-primary-200 rounded bg-red-500 dark:bg-red-500'
                  : 'text-red-400 dark:text-red-500',
                'block w-full px-4 py-2 text-left text-sm',
              ]"
              @click="logout()"
            >
              Logout
            </button>
          </menu-item>
        </div>
      </menu-items>
    </transition>
  </menu>
</template>
