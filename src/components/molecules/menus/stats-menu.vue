<script setup lang="ts">
import {
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
      <icon v-if="smallerThanLg" class="text-red-500" name="line-md:calendar" />
    </button>

    <transition-root v-if="smallerThanLg" as="template" :show="showPanel">
      <dialog as="div" class="relative z-50" @close="showPanel = false">
        <transition-child
          as="template"
          enter="ease-in-out duration-500"
          enter-from="opacity-50"
          enter-to="opacity-100"
          leave="ease-in-out duration-1000"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="bg-primary-800 fixed inset-0 bg-opacity-50 backdrop-blur transition-opacity"
          />
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
            class="bg-primary-50 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-100 fixed bottom-0 right-0 flex h-auto w-screen flex-col justify-between overflow-y-auto rounded-t-lg border-t focus:outline-none dark:border-t"
          >
            <div class="flex flex-col space-y-2 p-3">
              <button
                v-for="period in options"
                :key="period.name"
                :class="[
                  selectedPeriod.value === period.value ? 'text-primary-100 bg-red-500' : '',
                ]"
                class="no-select group flex w-full items-center space-x-4 rounded-md px-4 py-3"
                @click="emitChange(period)"
              >
                <p>{{ period.name }}</p>
              </button>
            </div>
          </dialog-panel>
        </transition-child>
      </dialog>
    </transition-root>

    <listbox v-else :model-value="selectedPeriod" @update:model-value="emitChange">
      <div class="relative mt-1">
        <listbox-button
          class="bg-primary-50 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-200 relative flex w-fit cursor-pointer flex-row items-center justify-between space-x-4 rounded border px-4 py-2 focus:outline-none sm:text-sm"
        >
          <icon name="line-md:calendar" class="text-primary-600" size="20" />
          <p class="block truncate text-sm">{{ selectedPeriod.name }}</p>
          <icon name="mdi:chevron-down" />
        </listbox-button>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <listbox-options
            class="border-primary-800 bg-primary-50 dark:bg-primary-900 absolute z-[50] mt-2 max-h-64 w-full space-y-1 overflow-auto rounded-md p-2 text-base shadow-lg ring-opacity-5 focus:outline-none"
          >
            <listbox-option
              v-for="period in options"
              v-slot="{ active, selected }"
              :key="period.name"
              :value="period"
              as="template"
            >
              <li
                :class="[
                  active
                    ? 'bg-primary-200 text-primary-700 dark:bg-primary-700 rounded dark:text-red-500'
                    : '',
                  'relative w-full cursor-default select-none rounded',
                ]"
              >
                <div
                  class="dark:text-primary-200 flex items-center justify-between rounded px-4 py-2"
                  :class="[selected ? 'text-primary-50 bg-red-500' : '']"
                >
                  <p>{{ period.name }}</p>
                  <icon v-if="selected" name="ph:check" size="20" />
                </div>
              </li>
            </listbox-option>
          </listbox-options>
        </transition>
      </div>
    </listbox>
  </div>
</template>
