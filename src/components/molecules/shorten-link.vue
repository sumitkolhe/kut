<script lang="ts" setup>
import BaseButton from '~~/src/components/atoms/buttons/primary-button.vue'
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
  <div class="relative flex w-full flex-col">
    <div class="flex space-y-3 md:space-y-0 md:space-x-2 flex-col md:flex-row">
      <!-- Link input field  -->
      <div class="w-full flex">
        <label for="link" class="sr-only">Enter Link</label>
        <span
          class="flex dark:bg-gray-700 dark:text-gray-300 items-center rounded-l border-t border-l border-b dark:border-gray-700 border-gray-200 bg-gray-100 px-3 text-sm text-gray-500"
        >
          https://
        </span>

        <BaseInput
          v-model="linkPayload.target"
          placeholder="Enter a url..."
          class="rounded-tl-none rounded-bl-none"
        />
      </div>

      <!-- buttons  -->
      <div class="flex space-x-2">
        <BaseButton
          class="w-auto"
          type="secondary"
          @click="showAdvancedOptions = !showAdvancedOptions"
        >
          <Icon
            name="lucide:settings"
            class="text-gray-400 transition-all duration-200"
            :class="[showAdvancedOptions ? '' : '-rotate-90']"
          />
        </BaseButton>

        <BaseButton :loading="loading" class="w-full md:w-auto px-8" @click="shortenLink">
          Shorten
        </BaseButton>
      </div>
    </div>

    <!-- Advanced Options  -->
    <Transition name="slide-fade">
      <div
        v-if="showAdvancedOptions"
        class="w-full border p-4 md:p-6 rounded-md my-4 bg-white flex flex-col dark:bg-gray-900 dark:border-gray-700"
      >
        <div class="space-y-1">
          <p class="font-medium text-gray-900 dark:text-gray-200">Advance Options</p>
          <p class="text-sm text-gray-500">Customize link parameters as per your needs</p>
        </div>

        <div class="relative mt-6 grid grid-cols-1 lg:grid-cols-2 gap-x-16">
          <div class="flex items-center py-3 justify-between">
            <p
              class="text-sm tracking-wide bg-gray-100 border rounded p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              Alias
            </p>

            <BaseInput class="w-3/5" placeholder="Enter alias" />
          </div>
          <div class="flex items-center py-3 justify-between">
            <p
              class="text-sm tracking-wide bg-gray-100 border rounded p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              Description
            </p>
            <BaseInput class="w-3/5" placeholder="Enter description" />
          </div>
          <div class="flex items-center py-3 justify-between">
            <p
              class="text-sm tracking-wide bg-gray-100 border rounded p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              Password
            </p>
            <BaseInput class="w-3/5" placeholder="Enter password" />
          </div>
          <div class="flex items-center py-3 justify-between">
            <p
              class="text-sm tracking-wide bg-gray-100 border rounded p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              Max Visits
            </p>
            <BaseInput class="w-3/5" placeholder="Enter maximum no. of visits" />
          </div>
          <div class="flex items-center py-3 justify-between">
            <p
              class="text-sm tracking-wide bg-gray-100 border rounded p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              Valid From
            </p>
            <BaseInput class="w-3/5" placeholder="Enter valid from date" />
          </div>
          <div class="flex items-center py-3 justify-between">
            <p
              class="text-sm tracking-wide bg-gray-100 border rounded p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              Valid Till
            </p>
            <BaseInput class="w-3/5" placeholder="Enter valid till date" />
          </div>
          <div class="flex items-center justify-between py-3">
            <p
              class="text-sm tracking-wide bg-gray-100 border rounded p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
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
                    <Icon name="ph:x-bold" class="text-gray-400" size="10" />
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
                    <Icon name="ph:check-bold" class="text-red-500" size="10" />
                  </span>
                </span>
              </Switch>
            </span>
          </div>
        </div>
      </div>
    </Transition>
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
