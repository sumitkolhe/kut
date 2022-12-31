<script lang="ts" setup>
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import SecondaryButton from 'components/atoms/buttons/secondary-button.vue'
import TextInput from 'components/atoms/inputs/text-input.vue'
import PrimaryToggle from 'components/atoms/toggles/primary-toggle.vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useLinkStore } from 'store/link.store'
import useValidate from 'vue-tiny-validate'
import type { Rules } from 'vue-tiny-validate'
import type { Link } from 'interfaces/link.interface'

// store
const LinkStore = useLinkStore()

// refs
const showAdvancedOptions = ref(false)
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
  <div class="relative flex w-full flex-col">
    <div class="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-2">
      <!-- Link input field  -->
      <div class="flex w-full flex-col space-x-0 space-y-4 md:flex-row md:space-x-2 md:space-y-0">
        <div class="flex w-full space-x-2">
          <text-input
            v-model="linkPayload.target"
            :errors="result.target.$messages"
            prefix-icon="ph:link-simple"
            placeholder="Enter a url..."
            @keyup.enter="shortenLink"
          />
          <secondary-button class="h-fit w-fit" @click="openAdvancedOptions">
            <icon
              name="octicon:settings-24"
              class="text-gray-400 transition-all duration-200"
              :class="[showAdvancedOptions ? '' : '-rotate-90']"
            />
          </secondary-button>
        </div>

        <primary-button
          suffix-icon="octicon:paper-airplane-24"
          :loading="loading"
          class="w-full md:w-auto"
          @click="shortenLink"
        >
          Shorten
        </primary-button>
      </div>
    </div>

    <transition-root as="template" :show="advancedOptions">
      <Dialog as="div" class="relative z-50">
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
          enter-from="translate-y-full md:translate-x-full md:translate-y-0"
          enter-to="translate-y-0 md:translate-x-0 md:translate-y-0"
          leave="transform transition ease-in-out duration-300"
          leave-from="translate-y-0 md:translate-x-0 md:translate-y-0"
          leave-to="translate-y-full md:translate-x-full md:translate-y-0"
        >
          <dialog-panel
            class="fixed bottom-0 flex h-full max-h-[75%] w-screen flex-col justify-between overflow-y-auto rounded-t-lg border-l-0 bg-gray-50 dark:border-t dark:border-gray-700 dark:bg-gray-900 md:right-0 md:max-h-screen md:w-[50%] md:rounded-t-none md:border-t-0 md:border-l lg:w-[33%]"
          >
            <div class="space-y-1 p-4 md:p-6">
              <p class="font-medium text-gray-900 dark:text-gray-200">Advance Options</p>
              <p class="text-sm text-gray-500">Customize link parameters</p>
            </div>

            <div class="flex flex-col space-y-6 p-4 md:p-6">
              <div class="">
                <text-input v-model="linkPayload.alias" label="Alias" placeholder="Enter alias" />
              </div>
              <div class="">
                <text-input
                  v-model="linkPayload.description"
                  label="Description"
                  placeholder="Enter description"
                />
              </div>
              <div class="">
                <text-input
                  v-model="linkPayload.meta.password"
                  label="Password"
                  placeholder="Enter password"
                />
              </div>
              <div class="">
                <text-input
                  v-model="linkPayload.meta.maxVisits"
                  label="Max. Visits"
                  placeholder="Enter maximum no. of visits"
                />
              </div>
              <div class="">
                <text-input
                  v-model="linkPayload.meta.validFrom"
                  label="Valid From"
                  type="datetime-local"
                  placeholder="Enter valid from date"
                />
              </div>
              <div class="">
                <text-input
                  v-model="linkPayload.meta.validTill"
                  label="Valid Till"
                  type="datetime-local"
                  placeholder="Enter valid till date"
                />
              </div>
              <div class="flex justify-between">
                <p class="text-sm text-gray-500">Disable Link</p>
                <primary-toggle v-model="linkPayload.meta.active"></primary-toggle>
              </div>
            </div>
            <div
              class="bottom-0 flex w-full flex-row items-center justify-end space-x-4 border-t p-4 dark:border-gray-700 md:p-6"
            >
              <secondary-button class="w-auto" @click="closeAdvancedOptions">
                Cancel
              </secondary-button>
              <primary-button class="w-auto px-8" @click="saveAdvancedOptions">
                Save
              </primary-button>
            </div>
          </dialog-panel>
        </transition-child>
      </Dialog>
    </transition-root>
  </div>
</template>
