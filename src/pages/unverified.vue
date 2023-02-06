<script lang="ts" setup>
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import { useAuthStore } from 'store/auth.store'
import { storeToRefs } from 'pinia'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

definePageMeta({
  middleware: () => {
    const { user } = storeToRefs(useAuthStore())

    if (user.value?.isVerified) return navigateTo('/dashboard')
  },
})

const { resendVerificationEmail } = useAuthStore()
const { user } = storeToRefs(useAuthStore())
</script>

<template>
  <section class="flex w-full items-center justify-center">
    <client-only>
      <TransitionRoot appear :show="true" as="template">
        <Dialog as="div" class="relative z-50">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="max-w-xl rounded-md bg-gray-100 p-16 px-8 text-center shadow-2xl md:border md:bg-gray-50"
                >
                  <div class="mb-4 text-xl font-semibold text-gray-800 md:text-2xl">
                    <p>Check your inbox</p>
                  </div>
                  <p class="mb-2 text-base text-gray-500 md:text-lg">
                    We’ve sent you a verification link to the email address
                    <span class="text-red-500"> {{ user?.email }} </span>
                  </p>
                  <div class="mx-12 flex flex-col items-center">
                    <primary-button class="mt-6 w-auto" @click="resendVerificationEmail()">
                      Resend Verification Email
                    </primary-button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </client-only>
  </section>
</template>
