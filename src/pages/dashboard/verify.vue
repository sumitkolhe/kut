<script lang="ts" setup>
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import { useAuthStore } from 'store/auth.store'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import type { User } from 'interfaces/user.interface'

const { resendVerificationEmail } = useAuthStore()
const { $auth } = useNuxtApp()

const user = computed(() => $auth.$storage.getStore()?.user?.data as User)

const isVerified = computed(() => user.value?.isVerified || false)

const route = useRoute()

onMounted(() => {
  if (user.value && isVerified.value === true && route.path.includes('/dashboard/verify'))
    return useRouter().replace('/dashboard')
})
</script>

<template>
  <section class="w-full flex items-center justify-center">
    <client-only>
      <TransitionRoot appear :show="true" as="template">
        <Dialog as="div" class="relative z-10">
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
                  class="max-w-xl p-16 px-8 shadow-2xl text-center bg-gray-100 rounded-md md:border md:bg-white"
                >
                  <div class="mb-2 text-4xl font-bold md:text-2xl text-zinc-800">
                    <p>Check your inbox</p>
                  </div>
                  <p class="mb-2 text-lg text-zinc-500">
                    We’ve sent you a verification link to the email address
                    <!-- <span class="font-medium text-red-500"> {{ user.email }} </span> -->
                  </p>
                  <div class="flex flex-col items-center mx-12">
                    <primary-button class="w-auto mt-6" @click="resendVerificationEmail()">
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
