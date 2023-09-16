<script lang="ts" setup>
import { useLinkStore } from 'store/link.store'
import PasswordInput from 'components/atoms/input/password-input.vue'
import PrimaryButton from 'components/atoms/button/primary-button.vue'
import useValidate from 'vue-tiny-validate'
import type { Rules } from 'vue-tiny-validate'

definePageMeta({
  layout: 'public',
  auth: 'guest',
})

const toast = useToast()
const route = useRoute()
const { redirectProtectedLink } = useLinkStore()

const passwordData = reactive({ password: '' })

const rules: Rules = reactive({
  password: {
    name: 'password',
    test: (value: string) => value.length > 0,
    message: 'Password cannot be empty.',
  },
})

const { result } = useValidate(passwordData, rules)

const redirect = async () => {
  result.value.$test()

  if (result.value.$invalid) return

  const headers = useRequestHeaders()
  const userAgent = headers?.['user-agent'] ?? navigator.userAgent

  const { error, data } = await redirectProtectedLink(
    route.params.alias as string,
    userAgent,
    passwordData.password
  )

  if (!error) {
    return navigateTo(data, { external: true, redirectCode: 301 })
  } else {
    toast.add({ title: 'Invalid password', description: error, color: 'primary' })
  }
}
</script>

<template>
  <div class="bg-primary-50 dark:bg-primary-900 flex min-h-screen items-center justify-center px-6">
    <div class="flex w-full max-w-sm flex-col items-center justify-center space-y-4">
      <div class="mb-6 flex flex-col items-center space-y-1 text-center">
        <p class="dark:text-primary-200 text-2xl font-medium">Protected link</p>
        <p class="dark:text-primary-300 text-base">Enter a password to visit the link</p>
      </div>
      <password-input
        v-model="passwordData.password"
        :errors="result.$messages"
        label="Password"
        placeholder="********"
      />
      <primary-button @click="redirect">Submit</primary-button>
    </div>
  </div>
</template>
