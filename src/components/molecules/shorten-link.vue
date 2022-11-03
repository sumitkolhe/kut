<script lang="ts" setup>
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import SecondaryButton from 'components/atoms/buttons/secondary-button.vue'
import BaseInput from 'components/atoms/inputs/base-input.vue'
import { Switch } from '@headlessui/vue'
import { useLinkStore } from 'store/link.store'
import type { Link } from 'interfaces/link.interface'

// store
const LinkStore = useLinkStore()

// refs
const showAdvancedOptions = ref(false)
const enabled = ref(false)
const loading = ref(false)

const linkPayload = reactive<Pick<Link, 'alias' | 'target' | 'meta' | 'description'>>({
  alias: null,
  target: '',
  description: null,
  meta: {
    password: null,
    validFrom: new Date(),
    validTill: null,
    maxVisits: null,
    active: true,
  },
})

const shortenLink = async () => {
  loading.value = true
  await LinkStore.shortenLink(linkPayload)
  loading.value = false
}
</script>

<template>
  <div class="relative flex flex-col w-full">
    <div class="flex flex-col space-y-3 md:space-y-0 md:space-x-2 md:flex-row">
      <!-- Link input field  -->
      <div class="flex w-full">
        <label for="link" class="sr-only">Enter Link</label>
        <span
          class="flex items-center px-3 text-sm text-gray-500 bg-gray-100 border-t border-b border-l border-gray-200 rounded-l dark:bg-gray-700 dark:text-gray-300 dark:border-gray-700"
        >
          https://
        </span>

        <base-input
          v-model="linkPayload.target"
          placeholder="Enter a url..."
          class="rounded-tl-none rounded-bl-none"
        />
      </div>

      <!-- buttons  -->
      <div class="flex space-x-2">
        <secondary-button class="w-auto" @click="showAdvancedOptions = !showAdvancedOptions">
          <icon
            name="lucide:settings"
            class="text-gray-400 transition-all duration-200"
            :class="[showAdvancedOptions ? '' : '-rotate-90']"
          />
        </secondary-button>

        <primary-button :loading="loading" class="w-full px-8 md:w-auto" @click="shortenLink">
          Shorten
        </primary-button>
      </div>
    </div>

    <!-- Advanced Options  -->
    <transition name="slide-fade">
      <div
        v-if="showAdvancedOptions"
        class="flex flex-col w-full p-4 my-4 bg-white border rounded-md md:p-6 dark:bg-gray-900 dark:border-gray-700"
      >
        <div class="space-y-1">
          <p class="font-medium text-gray-900 dark:text-gray-200">Advance Options</p>
          <p class="text-sm text-gray-500">Customize link parameters as per your needs</p>
        </div>

        <div class="relative grid grid-cols-1 mt-6 lg:grid-cols-2 gap-x-16">
          <div class="flex items-center justify-between py-3">
            <p
              class="p-2 text-sm tracking-wide bg-gray-100 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              Alias
            </p>

            <base-input class="w-3/5" placeholder="Enter alias" />
          </div>
          <div class="flex items-center justify-between py-3">
            <p
              class="p-2 text-sm tracking-wide bg-gray-100 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              Description
            </p>
            <base-input class="w-3/5" placeholder="Enter description" />
          </div>
          <div class="flex items-center justify-between py-3">
            <p
              class="p-2 text-sm tracking-wide bg-gray-100 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              Password
            </p>
            <base-input class="w-3/5" placeholder="Enter password" />
          </div>
          <div class="flex items-center justify-between py-3">
            <p
              class="p-2 text-sm tracking-wide bg-gray-100 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              Max Visits
            </p>
            <base-input class="w-3/5" placeholder="Enter maximum no. of visits" />
          </div>
          <div class="flex items-center justify-between py-3">
            <p
              class="p-2 text-sm tracking-wide bg-gray-100 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              Valid From
            </p>
            <base-input class="w-3/5" placeholder="Enter valid from date" />
          </div>
          <div class="flex items-center justify-between py-3">
            <p
              class="p-2 text-sm tracking-wide bg-gray-100 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              Valid Till
            </p>
            <base-input class="w-3/5" placeholder="Enter valid till date" />
          </div>
          <div class="flex items-center justify-between py-3">
            <p
              class="p-2 text-sm tracking-wide bg-gray-100 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              Disable Link
            </p>
            <span class="ml-auto">
              <Switch
                v-model="enabled"
                :class="[
                  enabled ? 'bg-red-500' : 'bg-gray-300',
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none',
                ]"
              >
                <span
                  :class="[
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                  ]"
                >
                  <span
                    :class="[
                      enabled
                        ? 'opacity-0 ease-out duration-100'
                        : 'opacity-100 ease-in duration-200',
                      'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                    ]"
                    aria-hidden="true"
                  >
                    <icon name="ph:x-bold" class="text-gray-400" size="10" />
                  </span>
                  <span
                    :class="[
                      enabled
                        ? 'opacity-100 ease-in duration-200'
                        : 'opacity-0 ease-out duration-100',
                      'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                    ]"
                    aria-hidden="true"
                  >
                    <icon name="ph:check-bold" class="text-red-500" size="10" />
                  </span>
                </span>
              </Switch>
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s;
}

.slide-fade-leave-active {
  transition: all 0.3s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
