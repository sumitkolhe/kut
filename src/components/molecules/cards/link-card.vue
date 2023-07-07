<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import LinkMenu from 'components/molecules/menus/link-menu.vue'
import QrCodePanel from 'components/molecules/panels/qr-code-panel.vue'
import type { LinkDto } from 'server/modules/links/dto'

// emits
defineEmits(['delete-link', 'edit-link', 'show-qr-code', 'copy-link'])

// props
defineProps({
  link: {
    type: Object as PropType<LinkDto>,
    required: true,
  },
})

const toggles = reactive({
  showQrCode: false,
})
</script>

<template>
  <div
    class="bg-primary-100 dark:border-primary-700 dark:bg-primary-800 flex w-full flex-col items-center gap-y-4 rounded-md p-4 md:px-6 md:py-5 lg:flex-row"
  >
    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-primary-300 text-xs uppercase tracking-wider">Short Link</p>

      <nuxt-link
        target="_blank"
        :to="link.shortUrl"
        class="text-primary-500 flex items-center text-sm"
      >
        <span v-slice="30" :title="link.shortUrl" class="truncate hover:underline">
          {{ link.shortUrl }}
        </span>
      </nuxt-link>
    </div>

    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-primary-300 text-xs uppercase tracking-wider">Target</p>
      <nuxt-link
        v-slice="30"
        target="_blank"
        :to="link.target"
        class="text-primary-500 truncate text-sm hover:underline"
      >
        {{ link.target }}
      </nuxt-link>
    </div>

    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-primary-300 text-xs uppercase tracking-wider">Views</p>

      <p class="text-primary-500 truncate text-sm">
        <span class="dark:text-primary-200 text-sm">{{ link.visitCount }}</span>
        {{ link?.visitCount && link.visitCount > 1 ? 'views' : 'view' }}
      </p>
    </div>

    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-primary-300 text-xs uppercase tracking-wider">Added</p>

      <p class="text-primary-500 text-sm" :title="link?.createdAt && link?.createdAt.toString()">
        {{ link?.createdAt && useTimeAgo(link.createdAt).value }}
      </p>
    </div>

    <div class="flex w-full flex-row items-center justify-between space-x-4 lg:w-fit">
      <nuxt-link
        :to="`/dashboard/${link.alias}`"
        title="Link Statistics"
        class="cursor-pointer rounded p-1 hover:bg-red-300 hover:bg-opacity-20"
      >
        <icon name="ph:chart-line-up" class="text-red-500" size="26" />
      </nuxt-link>
      <div
        title="Copy Link"
        class="cursor-pointer rounded p-1 hover:bg-red-300 hover:bg-opacity-20"
      >
        <icon name="ph:copy" class="text-red-500" size="26" @click="$emit('copy-link')" />
      </div>

      <div title="QR Code" class="cursor-pointer rounded p-1 hover:bg-red-300 hover:bg-opacity-20">
        <icon name="ph:qr-code" class="text-red-500" size="26" @click="toggles.showQrCode = true" />

        <qr-code-panel
          v-model:is-open="toggles.showQrCode"
          :link="link.shortUrl"
          @close="toggles.showQrCode = false"
        />
      </div>

      <div
        title="Edit Link"
        class="cursor-pointer rounded p-1 hover:bg-red-300 hover:bg-opacity-20"
      >
        <link-menu @edit-link="$emit('edit-link')" @delete-link="$emit('delete-link')" />
      </div>
    </div>
  </div>

  <!-- <div class="w-full rounded border border-l-4 border-l-red-400 px-4 py-6">
    <nuxt-link
      target="_blank"
      :to="link.shortUrl"
      class="rounded border border-red-400 bg-red-100 p-3 text-red-500 hover:underline"
    >
      {{ link.shortUrl }}
    </nuxt-link>
  </div> -->
</template>
