<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'

// props
const props = defineProps({
  link: {
    type: String,
    default: () => '',
    required: false,
  },
})

const isOpen = ref(false)

const qrcode = useQRCode(props.link, {
  scale: 100,
  color: { light: '#fff', dark: '#000' },
  renderOptions: { quality: 1 },
})

const downloadQrCode = () => {
  const linkSource = qrcode.value
  const downloadLink = document.createElement('a')
  document.body.append(downloadLink)

  downloadLink.href = linkSource
  downloadLink.target = '_self'
  downloadLink.download = props.link
  downloadLink.click()
}
</script>

<template>
  <div title="QR Code" class="cursor-pointer rounded p-1 hover:bg-red-500 hover:bg-opacity-20">
    <Icon name="ph:qr-code-duotone" class="text-red-500" size="26" @click="isOpen = true" />
    <transition-root appear :show="isOpen" as="template" @close="isOpen = false">
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
            class="max-h-auto fixed bottom-0 flex w-screen flex-col justify-between overflow-y-auto rounded-t-lg border-l-0 bg-gray-50 dark:border-t dark:border-gray-700 dark:bg-gray-900 md:right-0 md:h-full md:max-h-screen md:w-[50%] md:rounded-t-none md:border-t-0 md:border-l lg:w-[33%]"
          >
            <div class="space-y-1 border-b p-4 dark:border-gray-700 md:p-6">
              <p class="text-xl font-medium text-gray-900 dark:text-gray-200">Download QR Code</p>
            </div>
            <div
              class="flex flex h-full flex-col items-center justify-center space-y-6 bg-gray-100 p-12 dark:bg-gray-800"
            >
              <img :src="qrcode" alt="qr code" class="w-[75%] rounded-md border" />
            </div>

            <div
              class="bottom-0 flex w-full flex-row items-center justify-end space-x-4 border-t p-4 dark:border-gray-700 md:p-6"
            >
              <primary-button class="w-fit" @click="downloadQrCode">Export</primary-button>
            </div>
          </dialog-panel>
        </transition-child>
      </Dialog>
    </transition-root>
  </div>
</template>
