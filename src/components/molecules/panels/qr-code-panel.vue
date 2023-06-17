<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import PrimaryButton from 'components/atoms/button/primary-button.vue'

// emits
defineEmits(['close'])

// props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: () => false,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
})

const qrCodeImage = useQRCode(props.link, {
  scale: 10,
  color: { light: '#fff', dark: '#000' },
  renderOptions: { quality: 1 },
})

const downloadQrCode = () => {
  const linkSource = qrCodeImage.value
  const downloadLink = document.createElement('a')
  document.body.append(downloadLink)
  downloadLink.href = linkSource
  downloadLink.target = '_self'
  downloadLink.download = props.link
  downloadLink.click()
}
</script>

<template>
  <transition-root appear :show="isOpen" as="template" @close="$emit('close')">
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
        <div class="bg-primary-800 fixed inset-0 bg-opacity-50 backdrop-blur transition-opacity" />
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
          class="max-h-auto bg-primary-50 dark:border-primary-700 dark:bg-primary-900 fixed bottom-0 flex w-screen flex-col justify-between overflow-y-auto rounded-t-lg border-l-0 dark:border-t md:right-0 md:h-full md:max-h-screen md:w-[50%] md:rounded-t-none md:border-l md:border-t-0 lg:w-[33%]"
        >
          <div class="dark:border-primary-700 space-y-1 border-b p-4 md:p-6">
            <p class="text-primary-900 dark:text-primary-200 text-xl font-medium">
              Download QR Code
            </p>
          </div>
          <div
            class="bg-primary-100 dark:bg-primary-800 flex h-full flex-col items-center justify-center space-y-6 p-12"
          >
            <img
              v-if="props.link"
              :src="qrCodeImage"
              alt="qr code"
              class="w-[75%] rounded-md border"
            />
          </div>

          <div
            class="dark:border-primary-700 bottom-0 flex w-full flex-row items-center justify-end space-x-4 border-t p-4 md:p-6"
          >
            <primary-button
              suffix-icon="ph:arrow-circle-down"
              class="w-fit"
              @click="downloadQrCode"
            >
              Export
            </primary-button>
          </div>
        </dialog-panel>
      </transition-child>
    </Dialog>
  </transition-root>
</template>
