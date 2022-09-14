<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useAuthStore } from 'store/auth.store'

const AuthStore = useAuthStore()
</script>

<template>
  <header class="bg-white w-full py-2">
    <div class="max-w-screen-xl mx-auto flex flex-row justify-between">
      <div class="flex items-center space-x-3">
        <Icon name="gridicons:link" size="36" class="text-red-500" />
        <p class="font-medium uppercase text-lg">Trym</p>
      </div>

      <div class="flex items-center">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton class="border text-gray-500 rounded-full h-10 w-10 active:border-gray-300">
              UA
              <!-- <Icon name="ph:user-circle-light" size="32" class="text-gray-500" /> -->
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
              class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="p-2">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? '' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    Edit
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? '' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    Duplicate
                  </button>
                </MenuItem>
              </div>
              <div class="p-2">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? '' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    Archive
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? '' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    Move
                  </button>
                </MenuItem>
              </div>

              <div class="p-2">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-50 text-black' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                    @click="AuthStore.logout()"
                  >
                    Logout
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </header>
</template>
