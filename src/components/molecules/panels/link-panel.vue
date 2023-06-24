<script lang="ts" setup>
import useValidate from 'vue-tiny-validate'
import { useLinkStore } from 'store/link.store'
import type { Rules } from 'vue-tiny-validate'

// emits
const emits = defineEmits(['update:open-panel'])

// props
const props = defineProps({
  openPanel: {
    type: Boolean,
    required: true,
  },
})

const toast = useToast()

// store
const { shortenLink } = useLinkStore()

// refs
const loaders = reactive({
  createLinkLoader: false,
})

const rules: Rules = reactive({
  target: [
    {
      name: 'required',
      test: (value: string) => value.length > 0,
      message: 'Target cannot be empty',
    },
  ],
})

const linkPayload = reactive({
  alias: '',
  target: '',
  description: undefined,
  password: undefined,
  validFrom: new Date(),
  validTill: undefined,
  maxVisits: undefined,
  active: true,
})

const { result } = useValidate(linkPayload, rules)

const modifyLink = async () => {
  result.value.$test()
  if (result.value.$invalid) return

  loaders.createLinkLoader = true
  const { error } = await shortenLink({
    alias: linkPayload.alias,
    target: linkPayload.target,
    description: linkPayload.description,
    meta: {
      password: linkPayload.password,
      validFrom: linkPayload.validFrom,
      validTill: linkPayload.validTill,
      maxVisits: linkPayload.maxVisits,
      active: linkPayload.active,
    },
  })

  closePanel()
  loaders.createLinkLoader = false

  if (error) {
    createToast(error, { type: 'error' })
    toast.add({ title: 'Error creating link', description: error, color: 'red' })
  } else {
    toast.add({ title: 'Link created successfully', color: 'green' })
  }
}

const closePanel = () => {
  emits('update:open-panel', false)
}
</script>

<template>
  <u-slideover :model-value="props.openPanel">
    <div>
      <div class="dark:border-primary-700 dark:bg-primary-800 space-y-1 border-b p-4 md:p-4">
        <p class="text-primary-900 dark:text-primary-200 text-lg font-medium">Add a new link</p>
      </div>

      <div class="flex flex-col space-y-4 overflow-y-scroll p-4 md:p-6">
        <u-form-group :error="result.target.$messages[0]" label="Target">
          <u-input
            v-model="linkPayload.target"
            size="xl"
            trailing-icon="i-tabler-link"
            placeholder="https://github.com/sumitkolhe"
          />
        </u-form-group>

        <u-form-group label="Alias">
          <u-input
            v-model="linkPayload.alias"
            size="xl"
            placeholder="Enter alias"
            trailing-icon="i-tabler-pencil"
          />
        </u-form-group>

        <u-form-group label="Description">
          <u-input
            v-model="linkPayload.description"
            size="xl"
            placeholder="Description"
            trailing-icon="i-tabler-news"
          />
        </u-form-group>

        <u-form-group label="Password">
          <u-input
            v-model="linkPayload.password"
            size="xl"
            placeholder="Enter alias"
            trailing-icon="i-tabler-password"
          />
        </u-form-group>

        <u-form-group label="Maximum no. of visits">
          <u-input
            v-model="linkPayload.maxVisits"
            size="xl"
            placeholder="12"
            trailing-icon="i-tabler-pointer-bolt"
          />
        </u-form-group>

        <u-form-group label="Valid From">
          <u-input
            size="xl"
            type="datetime-local"
            placeholder="Valid From"
            trailing-icon="i-tabler-clock-plus"
          />
        </u-form-group>

        <u-form-group label="Valid Till">
          <u-input
            clearable
            size="xl"
            type="datetime-local"
            placeholder="Enter alias"
            trailing-icon="i-tabler-clock-x"
          />
        </u-form-group>

        <div
          class="bg-primary-100 dark:bg-primary-800 dark:border-primary-600 border-primary-200 flex justify-between rounded border p-3"
        >
          <p class="font-regular text-primary-700 dark:text-primary-500 block text-sm">
            Enable Link
          </p>
          <u-toggle
            v-model="linkPayload.active"
            on-icon="i-tabler-check"
            off-icon="i-tabler-x"
            size="xl"
          />
        </div>
      </div>

      <div
        class="bg-primary-100 dark:border-primary-700 dark:bg-primary-800 fixed bottom-0 flex w-full max-w-lg justify-end space-x-4 border-t px-6 py-4"
      >
        <u-button variant="outline" @click="closePanel"> Cancel </u-button>
        <u-button class="px-6" :loading="loaders.createLinkLoader" @click="modifyLink">
          Shorten
        </u-button>
      </div>
    </div>
  </u-slideover>
</template>
