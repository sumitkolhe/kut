<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

// emits
const emits = defineEmits(['delete-link', 'edit-link'])

// refs
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanLg = breakpoints.smaller('lg')
const showPanel = ref(false)

// functions
const deleteLink = () => {
  emits('delete-link')
  showPanel.value = false
}
</script>

<template>
  <div class="flex">
    <button title="Options" @click="showPanel = true">
      <icon v-if="smallerThanLg" class="text-red-500" name="ph:faders-horizontal" />
    </button>

    <transition-root v-if="smallerThanLg" as="template" :show="showPanel">
      <Dialog as="div" class="relative z-50" @close="showPanel = false">
        <transition-child
          as="template"
          enter="ease-in-out duration-500"
          enter-from="opacity-50"
          enter-to="opacity-100"
          leave="ease-in-out duration-1000"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur transition-opacity" />
        </transition-child>

        <transition-child
          as="template"
          enter="transform transition ease-in-out duration-300"
          enter-from="translate-y-full"
          enter-to="translate-y-0"
          leave="transform transition ease-in-out duration-300"
          leave-from="translate-y-0"
          leave-to="translate-y-full"
        >
          <dialog-panel
            class="fixed bottom-0 right-0 flex h-auto w-screen flex-col justify-between overflow-y-auto rounded-t-lg border-t bg-gray-50 focus:outline-none dark:border-t dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            <div class="flex flex-col space-y-2 p-3">
              <button
                class="no-select group flex w-full items-center space-x-4 rounded-md px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700"
                @click="$emit('edit-link')"
              >
                <icon name="ph:pencil" />
                <p>Edit</p>
              </button>

              <button
                class="no-select group flex w-full items-center space-x-4 rounded-md px-4 py-3 hover:bg-red-500 hover:text-gray-100"
                @click="deleteLink"
              >
                <icon name="ph:trash" />
                <p>Delete</p>
              </button>
            </div>
          </dialog-panel>
        </transition-child>
      </Dialog>
    </transition-root>

    <div v-else title="Options" class="flex w-full justify-end">
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <menu-button title="Options">
            <icon name="ph:dots-three-vertical-bold" class="text-red-500" size="26" />
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
            class="absolute right-0 z-50 mt-4 w-screen origin-top-right divide-y divide-gray-100 rounded-md border bg-gray-50 shadow-lg focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 md:w-44"
          >
            <div class="flex flex-col space-y-1 p-2">
              <menu-item>
                <button
                  title="Edit Link"
                  class="group flex w-full items-center space-x-4 rounded p-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                  @click="$emit('edit-link')"
                >
                  <icon name="ph:pencil" size="20" />

                  <p>Edit</p>
                </button>
              </menu-item>
              <menu-item>
                <button
                  title="Delete Link"
                  class="group flex w-full items-center space-x-4 rounded p-2 text-sm hover:bg-red-500 hover:text-gray-100"
                  @click="deleteLink"
                >
                  <icon name="ph:trash" size="20" />
                  <p>Delete</p>
                </button>
              </menu-item>
            </div>
          </menu-items>
        </transition>
      </Menu>
    </div>
  </div>
</template>
