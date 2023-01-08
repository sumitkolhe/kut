<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

interface Period {
  name: string
  value: string
}

// emits
const emits = defineEmits(['update:modelValue'])

// refs
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanLg = breakpoints.smaller('lg')
const showPanel = ref(false)

// functions
const options: Period[] = [
  { name: 'Last 1 Hour', value: '1h' },
  { name: 'Last 24 Hours', value: '24h' },
  { name: 'Last 7 Days', value: '7d' },
  { name: 'Last 30 Days', value: '30d' },
  { name: 'Last 180 Days', value: '180d' },
  { name: 'All Time', value: 'all' },
]
const selectedPeriod = ref(options[0])

const emitChange = (period: Period) => {
  emits('update:modelValue', period.value)
  selectedPeriod.value = period
  showPanel.value = false
}
</script>

<template>
  <div class="flex">
    <button
      title="Link visit period"
      class="flex rounded p-1 hover:bg-red-300 hover:bg-opacity-20"
      @click="showPanel = true"
    >
      <icon v-if="smallerThanLg" class="text-red-500" name="ph:calendar-blank" />
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
                v-for="period in options"
                :key="period.name"
                :class="[selectedPeriod.value === period.value ? 'bg-red-500 text-gray-100' : '']"
                class="no-select group flex w-full items-center space-x-4 rounded-md px-4 py-3"
                @click="emitChange(period)"
              >
                <p>{{ period.name }}</p>
              </button>
            </div>
          </dialog-panel>
        </transition-child>
      </Dialog>
    </transition-root>

    <Listbox v-else :model-value="selectedPeriod" @update:modelValue="emitChange">
      <div class="relative mt-1">
        <ListboxButton
          class="relative flex w-full w-56 cursor-pointer flex-row items-center justify-between rounded border bg-white px-4 py-2 text-left focus:outline-none sm:text-sm"
        >
          <Icon name="ph:calendar-blank" size="20" />
          <p class="block truncate text-sm">{{ selectedPeriod.name }}</p>
          <Icon name="mdi:chevron-down" />
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-[50] mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="period in options"
              v-slot="{ active, selected }"
              :key="period.name"
              :value="period"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-red-100 text-red-500' : 'text-gray-900',
                  'relative w-full cursor-default select-none',
                ]"
              >
                <div
                  class="flex items-center justify-between px-4 py-2"
                  :class="[selected ? 'bg-red-300' : '']"
                >
                  <p>{{ period.name }}</p>
                  <Icon v-if="selected" name="ph:check" size="20" />
                </div>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
