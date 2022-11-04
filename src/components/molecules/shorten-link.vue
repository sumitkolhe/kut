<script lang="ts" setup>
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import SecondaryButton from 'components/atoms/buttons/secondary-button.vue'
import BaseInput from 'components/atoms/inputs/base-input.vue'
import { Dialog, DialogPanel, Switch, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useLinkStore } from 'store/link.store'
import useValidate from 'vue-tiny-validate'
import type { Rules } from 'vue-tiny-validate'
import type { Link } from 'interfaces/link.interface'

// store
const LinkStore = useLinkStore()

// refs
const showAdvancedOptions = ref(false)
const enabled = ref(false)
const loading = ref(false)
const advancedOptions = ref(false)

const rules: Rules = reactive({
  target: {
    name: 'required',
    test: (value: string) => value.length > 0,
    message: 'Target cannot be empty',
  },
})

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

const { result } = useValidate(linkPayload, rules)

const saveAdvancedOptions = () => {
  advancedOptions.value = false
}

const closeAdvancedOptions = () => {
  linkPayload.alias = null
  linkPayload.description = null
  linkPayload.meta = {
    password: null,
    validFrom: new Date(),
    validTill: null,
    maxVisits: null,
    active: true,
  }
  advancedOptions.value = false
}

const openAdvancedOptions = () => {
  linkPayload.alias = null
  linkPayload.description = null
  linkPayload.meta = {
    password: null,
    validFrom: new Date(),
    validTill: null,
    maxVisits: null,
    active: true,
  }
  advancedOptions.value = true
}

const shortenLink = async () => {
  result.value.$test()
  if (!result.value.$invalid) {
    loading.value = true
    await LinkStore.shortenLink(linkPayload).then(() => {
      LinkStore.fetchAllLinks()
    })
    loading.value = false
  }
}
</script>

<template>
  <div class="relative flex flex-col w-full">
    <div class="flex flex-col space-y-3 md:space-y-0 md:space-x-2 md:flex-row">
      <!-- Link input field  -->
      <div class="flex flex-col w-full space-x-0 space-y-4 md:space-x-2 md:space-y-0 md:flex-row">
        <div class="flex w-full space-x-2">
          <base-input
            v-model="linkPayload.target"
            :errors="result.target.$messages"
            prefix-icon="ph:link-simple"
            placeholder="Enter a url..."
          />

          <secondary-button class="w-fit h-fit" @click="openAdvancedOptions">
            <icon
              name="octicon:settings-24"
              class="text-gray-400 transition-all duration-200"
              :class="[showAdvancedOptions ? '' : '-rotate-90']"
            />
          </secondary-button>
        </div>
        <div>
          <primary-button :loading="loading" class="w-full px-8 md:w-auto" @click="shortenLink">
            Shorten
          </primary-button>
        </div>
      </div>
    </div>

    <TransitionRoot as="template" :show="advancedOptions">
      <Dialog as="div" class="relative z-[999999999]">
        <TransitionChild
          as="template"
          enter="ease-in-out duration-500"
          enter-from="opacity-50"
          enter-to="opacity-100"
          leave="ease-in-out duration-1000"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 transition-opacity bg-gray-800 bg-opacity-75" />
        </TransitionChild>

        <div
          class="fixed bottom-0 rounded-t-lg md:inset-0 shadow-xl bg-opacity-30 overflow-y-auto max-h-[75%] md:max-h-screen flex"
        >
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-500"
            enter-from="md:-translate-y-6 translate-y-full"
            enter-to="translate-y-0 md:translate-y-0"
            leave="transform transition ease-in-out duration-500"
            leave-from="translate-y-0 md:translate-y-0"
            leave-to="md:translate-y-6 translate-y-full"
          >
            <DialogPanel
              class="bottom-0 w-screen p-6 md:m-12 lg:m-auto lg:w-fit md:rounded-lg md:p-8 h-fit md:inset-0 bg-gray-50 dark:text-gray-200 dark:bg-gray-900"
            >
              <div class="mb-4 space-y-1">
                <p class="font-medium text-gray-900 dark:text-gray-200">Advance Options</p>
                <p class="text-sm text-gray-500">Customize link parameters</p>
              </div>

              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-x-10">
                <div class="flex items-center py-3">
                  <base-input v-model="linkPayload.alias" label="Alias" placeholder="Enter alias" />
                </div>
                <div class="flex items-center justify-between py-2">
                  <base-input
                    v-model="linkPayload.description"
                    label="Description"
                    placeholder="Enter description"
                  />
                </div>
                <div class="flex items-center justify-between py-2">
                  <base-input
                    v-model="linkPayload.meta.password"
                    label="Password"
                    placeholder="Enter password"
                  />
                </div>
                <div class="flex items-center justify-between py-2">
                  <base-input
                    v-model="linkPayload.meta.maxVisits"
                    label="Max. Visits"
                    placeholder="Enter maximum no. of visits"
                  />
                </div>
                <div class="flex items-center py-2">
                  <base-input
                    v-model="linkPayload.meta.validFrom"
                    label="Valid From"
                    type="datetime-local"
                    placeholder="Enter valid from date"
                  />
                </div>
                <div class="flex items-center justify-between py-2">
                  <base-input
                    v-model="linkPayload.meta.validTill"
                    label="Valid Till"
                    type="datetime-local"
                    placeholder="Enter valid till date"
                  />
                </div>
                <div class="flex items-center justify-between py-3">
                  <p class="text-sm text-gray-500">Disable Link</p>
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

              <div class="flex flex-row items-end justify-end mt-6 space-x-4">
                <secondary-button class="w-auto" @click="closeAdvancedOptions">
                  Cancel
                </secondary-button>
                <primary-button class="w-auto px-8" @click="saveAdvancedOptions">
                  Save
                </primary-button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
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
