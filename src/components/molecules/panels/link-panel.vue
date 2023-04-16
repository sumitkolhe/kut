<script lang="ts" setup>
import PrimaryButton from 'components/atoms/button/primary-button.vue'
import SecondaryButton from 'components/atoms/button/secondary-button.vue'
import TextInput from 'components/atoms/input/text-input.vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import useValidate from 'vue-tiny-validate'
import dayjs from 'dayjs'
import type { Rules } from 'vue-tiny-validate'
import type { PropType } from 'vue'

// props
const props = defineProps({
  loading: {
    type: Boolean,
    default: () => false,
    required: true,
  },
  openPanel: {
    type: Boolean,
    required: true,
  },
  alias: {
    type: [String, null] as PropType<string | null>,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  description: {
    type: [String, null] as PropType<string | null>,
    default: () => '',
    required: false,
  },
  password: {
    type: [String, null] as PropType<string | null>,
    default: () => null,
    required: false,
  },
  validFrom: {
    type: [Date, String],
    default: () => new Date(),
    required: true,
  },
  validTill: {
    type: [Date, null] as PropType<Date | null>,
    default: () => null,
    required: false,
  },
  maxVisits: {
    type: [Number, null] as PropType<number | null>,
    default: () => null,
    required: false,
  },
  active: {
    type: Boolean,
    default: () => true,
    required: false,
  },
})

// emits
const emits = defineEmits([
  'update:alias',
  'update:target',
  'update:description',
  'update:password',
  'update:validFrom',
  'update:validTill',
  'update:maxVisits',
  'update:active',
  'update:openPanel',
  'saveLink',
])

const linkPayload = reactive({
  alias: props.alias,
  target: props.target,
  description: props.description,
  password: props.password,
  validFrom: props.validFrom,
  validTill: props.validTill,
  maxVisits: props.maxVisits,
  active: props.active,
})

// refs
const rules: Rules = reactive({
  target: [
    {
      name: 'required',
      test: (value: string) => value.length > 0,
      message: 'Target cannot be empty',
    },
  ],
})

const { result } = useValidate(linkPayload, rules)

const validateLinkPayload = async () => {
  result.value.$test()
  if (!result.value.$invalid) {
    emits('saveLink')
  }
}
</script>

<template>
  <transition-root as="template" :show="openPanel">
    <Dialog as="div" class="relative z-[70]">
      <transition-child
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-50"
        enter-to="opacity-100"
        leave="ease-in-out duration-1000"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity" />
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
          class="fixed bottom-0 flex h-full max-h-[90%] w-screen flex-col justify-between overflow-y-auto rounded-t-lg border-l-0 bg-gray-50 dark:border-t dark:border-gray-700 dark:bg-gray-900 md:right-0 md:rounded-t-none md:border-l md:border-t-0 md:dark:border-t-0 lg:max-h-screen lg:w-3/6 xl:w-2/6"
        >
          <div class="space-y-1 border-b p-4 dark:border-gray-700 dark:bg-gray-800 md:p-4">
            <p class="text-lg font-medium text-gray-900 dark:text-gray-200">Add a new link</p>
          </div>

          <div class="flex flex-col space-y-4 p-4 md:p-6">
            <text-input
              label="Target Link"
              placeholder="https://github.com/sumitkolhe"
              :model-value="linkPayload.target"
              :errors="result.target.$messages"
              prefix-icon="ph:link-simple"
              @input="$emit('update:target', $event.target.value)"
            />

            <text-input
              label="Alias"
              placeholder="Enter alias"
              :model-value="linkPayload.alias"
              prefix-icon="ph:pencil-simple-line"
              @input="$emit('update:alias', $event.target.value)"
            />

            <text-input
              :model-value="linkPayload.description"
              label="Description"
              prefix-icon="ph:notepad"
              placeholder="Enter description"
              @input="$emit('update:description', $event.target.value)"
            />

            <text-input
              :model-value="linkPayload.password"
              label="Password"
              prefix-icon="ph:password"
              placeholder="Enter password"
              @input="$emit('update:password', $event.target.value)"
            />

            <text-input
              :model-value="linkPayload.maxVisits"
              label="Max. Visits"
              prefix-icon="ph:hand-pointing"
              placeholder="Enter maximum no. of visits"
              @input="$emit('update:maxVisits', $event.target.value)"
            />

            <text-input
              :model-value="dayjs(linkPayload.validFrom).format('DD-MM-YY HH:MM')"
              label="Valid From"
              type="datetime-local"
              placeholder="Enter valid from date"
              @input="$emit('update:validFrom', new Date($event.target.value))"
            />

            <text-input
              :model-value="new Date(linkPayload.validTill!)?.toISOString()?.slice(0, 16)"
              label="Valid Till"
              type="datetime-local"
              placeholder="Enter valid till date"
              @input="$emit('update:validTill', new Date($event.target.value))"
            />

            <!-- <div class="flex flex-row items-center justify-between py-2">
              <p class="text-sm text-gray-500">Enable Link</p>
              <primary-toggle
                :model-value="linkPayload.active"
                @input="$emit('update:active', $event.target.value)"
              />
            </div> -->
          </div>

          <div
            class="sticky bottom-0 flex w-full justify-end space-x-6 border-t bg-gray-100 p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <secondary-button class="w-auto" @click="$emit('update:openPanel', false)">
              Cancel
            </secondary-button>

            <primary-button
              suffix-icon="octicon:paper-airplane-24"
              :loading="loading"
              class="w-full md:w-auto"
              @click="validateLinkPayload"
            >
              Shorten
            </primary-button>
          </div>
        </dialog-panel>
      </transition-child>
    </Dialog>
  </transition-root>
</template>
