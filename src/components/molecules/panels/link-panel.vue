<script lang="ts" setup>
import TextInput from 'components/atoms/input/text-input.vue'
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
const createLinkLoader = ref(false)

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
  description: '',
  meta: {
    password: '',
    validFrom: new Date(),
    validTill: new Date(),
    maxVisits: 2,
    active: true,
  },
})

const { result } = useValidate(linkPayload, rules)

const modifyLink = async () => {
  result.value.$test()
  if (result.value.$invalid) return

  createLinkLoader.value = true
  const { error } = await shortenLink(linkPayload)

  closePanel()
  createLinkLoader.value = false

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
    <div class="">
      <div class="dark:border-primary-700 dark:bg-primary-800 space-y-1 border-b p-4 md:p-4">
        <p class="text-primary-900 dark:text-primary-200 text-lg font-medium">Add a new link</p>
      </div>

      <div class="flex flex-col space-y-4 p-4 md:p-6">
        <u-form-group :error="result.target.$messages[0]" label="Target">
          <u-input
            v-model="linkPayload.target"
            size="xl"
            trailing-icon="i-tabler-link"
            placeholder="https://github.com/sumitkolhe"
          />
        </u-form-group>

        <u-form-group :error="result.alias.$messages[0]" label="Alias">
          <u-input
            v-model="linkPayload.alias"
            size="xl"
            placeholder="Enter alias"
            trailing-icon="i-tabler-edit-circle"
          />
        </u-form-group>

        <u-form-group :error="result.description.$messages[0]" label="Description">
          <u-input
            v-model="linkPayload.alias"
            size="xl"
            placeholder="Description"
            trailing-icon="i-tabler-edit-circle"
          />
        </u-form-group>

        <u-form-group :error="result.meta.password.$messages[0]" label="Password">
          <u-input
            v-model="linkPayload.meta.password"
            size="xl"
            placeholder="Enter alias"
            trailing-icon="i-tabler-edit-circle"
          />
        </u-form-group>

        <u-form-group :error="result.target.$messages[0]" label="Alias">
          <u-input
            v-model="linkPayload.alias"
            size="xl"
            placeholder="Enter alias"
            trailing-icon="i-tabler-edit-circle"
          />
        </u-form-group>

        <u-form-group :error="result.target.$messages[0]" label="Alias">
          <u-input
            v-model="linkPayload.alias"
            size="xl"
            placeholder="Enter alias"
            trailing-icon="i-tabler-edit-circle"
          />
        </u-form-group>

        <u-form-group :error="result.target.$messages[0]" label="Alias">
          <u-input
            v-model="linkPayload.alias"
            size="xl"
            placeholder="Enter alias"
            trailing-icon="i-tabler-edit-circle"
          />
        </u-form-group>

        <text-input
          v-model="linkPayload.description"
          label="Description"
          prefix-icon="ph:notepad"
          placeholder="Enter description"
        />

        <text-input
          v-model="linkPayload.meta.password"
          label="Password"
          prefix-icon="ph:password"
          placeholder="Enter password"
        />

        <text-input
          v-model="linkPayload.meta.maxVisits"
          label="Max. Visits"
          prefix-icon="ph:hand-pointing"
          placeholder="Enter maximum no. of visits"
        />

        <text-input
          v-model="linkPayload.meta.validFrom"
          label="Valid From"
          type="datetime-local"
          placeholder="Enter valid from date"
        />

        <text-input
          v-model="linkPayload.meta.validTill"
          label="Valid Till"
          type="datetime-local"
          placeholder="Enter valid till date"
        />

        <!-- <div class="flex flex-row items-center justify-between py-2">
              <p class="text-sm text-primary-500">Enable Link</p>
              <primary-toggle
                :model-value="linkPayload.active"
                @input="$emit('update:active', $event.target.value)"
              />
            </div> -->
      </div>
      <div
        class="bg-primary-100 dark:border-primary-700 dark:bg-primary-800 fixed bottom-0 flex w-full max-w-lg justify-end space-x-6 border-t p-6"
      >
        <u-button variant="outline" @click="closePanel"> Cancel </u-button>
        <u-button @click="modifyLink"> Shorten </u-button>
      </div>
    </div>
  </u-slideover>
</template>
