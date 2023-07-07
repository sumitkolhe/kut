<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'

// emits
defineEmits(['update:is-open'])

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
  <u-slideover :model-value="props.isOpen">
    <div>
      <div
        class="dark:border-primary-700 dark:bg-primary-800 flex items-center justify-between space-y-1 border-b p-4 md:p-4"
      >
        <p class="text-primary-900 dark:text-primary-200 text-lg font-medium">Download QR Code</p>
        <UButton
          icon="i-tabler-x"
          size="sm"
          variant="outline"
          square
          @click="$emit('update:is-open', false)"
        />
      </div>

      <div
        class="bg-primary-100 dark:bg-primary-800 flex flex-col items-center justify-center space-y-6 p-12"
      >
        <img v-if="props.link" :src="qrCodeImage" alt="qr code" class="w-[75%] rounded-md border" />
      </div>

      <div
        class="bg-primary-100 dark:border-primary-700 dark:bg-primary-800 fixed bottom-0 flex w-full max-w-lg justify-end space-x-4 border-t px-6 py-4"
      >
        <u-button trailing-icon="i-tabler-download" block @click="downloadQrCode">
          Export
        </u-button>
      </div>
    </div>
  </u-slideover>
</template>
