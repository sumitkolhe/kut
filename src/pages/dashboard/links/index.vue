<script lang="ts" setup>
import IconButton from 'components/atoms/buttons/icon-button.vue'
import { useLinkStore } from 'store/link.store'
import { useOffsetPagination } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import LinkCard from 'components/molecules/cards/link-card.vue'
import TextInput from 'components/atoms/inputs/text-input.vue'
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import QrCodePanel from 'components/molecules/panels/qr-code-panel.vue'
import CreateLinkPanel from 'components/molecules/panels/create-link-panel.vue'
import type { Link } from 'interfaces/link.interface'

definePageMeta({
  middleware: ['auth'],
  breadcrumbs: 'Links',
})

// store
const { fetchAllLinks, deleteLink, shortenLink } = useLinkStore()
const { totalCount, allLinks } = storeToRefs(useLinkStore())

onMounted(async () => {
  linksLoader.value = true
  await fetchAllLinks(0, 5)
  linksLoader.value = false
})

// refs
const showLinkPanel = ref(false)
const loading = ref(false)
const linksLoader = ref(false)
const search = ref()
const qrCode = ref()
const openQrCode = ref(false)

const linkPayload = reactive<Pick<Link, 'alias' | 'target' | 'meta' | 'description'>>({
  alias: null,
  target: '',
  description: null,
  meta: {
    password: null,
    validFrom: new Date(),
    validTill: null,
    maxVisits: null,
    active: true,
  },
})

// functions
const debouncedSearch = useDebounceFn(async () => {
  linksLoader.value = true
  await fetchAllLinks(0, 5, search.value)
  linksLoader.value = false
}, 500)

const createLink = async () => {
  loading.value = true
  await shortenLink(linkPayload).then(async () => {
    loading.value = false
    showLinkPanel.value = false
  })
}

const deleteSelectedLink = async (alias: string | null) => {
  if (alias) await deleteLink(alias)
}

const editSelectedLink = async (alias: string | null) => {
  console.log(alias)
}

const { currentPage, pageCount, prev, next, isFirstPage, isLastPage } = useOffsetPagination({
  total: totalCount,
  page: 1,
  pageSize: 5,
  onPageChange: async ({
    currentPage,
    currentPageSize,
  }: {
    currentPage: number
    currentPageSize: number
  }) => {
    linksLoader.value = true
    await fetchAllLinks((currentPage - 1) * 5, currentPageSize)
    linksLoader.value = false
  },
})

const showQrCode = (url: string) => {
  qrCode.value = url
  openQrCode.value = true
}

const { copy, copied, text } = useClipboard()

watch(copied, (clicked) => {
  if (clicked) createToast(`${text.value} copied to clipboard`, { type: 'success' })
})
</script>

<template>
  <section class="my-6 w-full gap-6 md:my-8">
    <div class="relative flex w-full flex-col">
      <div class="flex flex-row space-x-2">
        <text-input
          v-model="search"
          clearable
          prefix-icon="ph:magnifying-glass-duotone"
          placeholder="Search..."
          @update:model-value="debouncedSearch"
        />

        <primary-button
          suffix-icon="ph:plus-duotone"
          :loading="loading"
          class="hidden w-full md:block md:w-36"
          @click="showLinkPanel = true"
        >
          Add Link
        </primary-button>
        <primary-button
          :loading="loading"
          class="w-fit text-gray-100 hover:text-gray-900 md:hidden"
          @click="showLinkPanel = true"
        >
          <icon name="ph:plus" class="transition-all duration-200" />
        </primary-button>
      </div>

      <create-link-panel
        v-model:active="linkPayload.meta.active"
        v-model:alias="linkPayload.alias"
        v-model:description="linkPayload.description"
        v-model:target="linkPayload.target"
        v-model:valid-from="linkPayload.meta.validFrom"
        v-model:valid-till="linkPayload.meta.validTill"
        v-model:password="linkPayload.meta.password"
        v-model:max-visits="linkPayload.meta.maxVisits"
        v-model:open-panel="showLinkPanel"
        :loading="loading"
        @create-link="createLink"
      ></create-link-panel>
    </div>

    <div v-if="linksLoader" class="my-6 flex w-full flex-col gap-6 md:my-8">
      <div
        v-for="i in [1, 2, 3, 4]"
        :key="i"
        class="w-full animate-pulse space-y-2 rounded-md border bg-gray-50 p-5"
      >
        <div class="flex-1 space-y-6">
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-1 h-2 rounded-full bg-gray-300"></div>
          </div>

          <div class="col-span-1 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>

    <div v-else>
      <div v-if="allLinks.length > 0">
        <p class="mt-6 py-3 font-medium uppercase text-gray-600 dark:text-gray-200">My Links</p>

        <div class="space-y-3">
          <link-card
            v-for="link in allLinks.slice(0, 5)"
            :key="link.alias?.toString()"
            :alias="link.alias"
            :description="link.description"
            :target="link.target"
            :short-url="link.shortUrl"
            :visit-count="link.visitCount"
            :created-at="link.createdAt.toString()"
            :updated-at="link.updatedAt.toString()"
            @copy-link="copy(link.shortUrl)"
            @delete-link="deleteSelectedLink(link.alias)"
            @edit-link="editSelectedLink(link.alias)"
            @qr-code="showQrCode"
          />
        </div>

        <qr-code-panel
          v-if="qrCode"
          :key="qrCode"
          :is-open="openQrCode"
          :link="qrCode"
          @close="openQrCode = false"
        />

        <div class="flex justify-center md:justify-end">
          <div class="mt-6 mb-0 flex items-end items-center justify-end gap-3">
            <icon-button :disabled="isFirstPage" icon="line-md:chevron-left" @click="prev" />
            <p class="text-sm dark:text-gray-400">
              {{ currentPage }}
              <span class="mx-0.25">/</span>
              {{ pageCount }}
            </p>
            <icon-button :disabled="isLastPage" icon="line-md:chevron-right" @click="next" />
          </div>
        </div>
      </div>

      <div
        v-else
        class="relative my-6 flex h-64 flex-col items-center justify-center rounded border bg-gray-50 px-4 py-6 dark:border-gray-700 dark:bg-gray-900"
      >
        <icon name="ph:link-break-duotone" size="44" class="opacity-50 dark:text-gray-400" />
        <p class="mt-4 mb-1 font-medium dark:text-gray-200">No Links</p>
        <p class="font-light text-gray-400 dark:text-gray-500">
          Get started by creating a new link.
        </p>
      </div>
    </div>
  </section>
</template>
