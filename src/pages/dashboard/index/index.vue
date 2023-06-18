<script lang="ts" setup>
import { useLinkStore } from 'store/link.store'
import { useOffsetPagination } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import LinkCard from 'components/molecules/cards/link-card.vue'
import QrCodePanel from 'components/molecules/panels/qr-code-panel.vue'
import LinkPanel from 'components/molecules/panels/link-panel.vue'
import Paginator from 'components/molecules/paginator.vue'

// store
const { fetchAllLinks, deleteLink } = useLinkStore()
const { totalCount, allLinks } = storeToRefs(useLinkStore())

// refs
const showCreateLinkPanel = ref(false)
const allLinksLoader = ref(true)
const searchLinksLoader = ref(false)
const search = ref()
const qrCode = ref()
const openQrCode = ref(false)

onMounted(async () => {
  allLinksLoader.value = true
  await fetchAllLinks(0, 5)
  allLinksLoader.value = false
})

// functions
const debouncedSearch = useDebounceFn(async () => {
  searchLinksLoader.value = true
  await fetchAllLinks(0, 5, search.value)
  searchLinksLoader.value = false
}, 500)

const deleteSelectedLink = async (alias: string | null) => {
  if (alias) await deleteLink(alias)
}

const { currentPage, pageCount, prev, next, isFirstPage, isLastPage } = useOffsetPagination({
  total: totalCount,
  page: 1,
  pageSize: 5,
  onPageChange: async ({ currentPage, currentPageSize }) => {
    allLinksLoader.value = true
    await fetchAllLinks((currentPage - 1) * 5, currentPageSize)
    allLinksLoader.value = false
  },
})

const showQrCode = (url: string) => {
  qrCode.value = url
  openQrCode.value = true
}

const { copy, copied, text } = useClipboard({ legacy: true })

watch(copied, (clicked) => {
  if (clicked) createToast(`${text.value} copied to clipboard`, { type: 'success' })
})
</script>

<template>
  <section class="my-6 w-full gap-6 md:my-8">
    <div class="relative flex w-full flex-col">
      <div class="flex flex-row space-x-3">
        <u-input
          v-model="search"
          class="w-full"
          size="xl"
          type="email"
          :loading="searchLinksLoader"
          placeholder="Search..."
          icon="i-tabler-search"
          @update:model-value="debouncedSearch"
        />

        <u-button trailing-icon="i-tabler-plus" @click="showCreateLinkPanel = true">
          Add link
        </u-button>
      </div>

      <link-panel v-model:open-panel="showCreateLinkPanel" />
    </div>

    <div v-if="allLinksLoader" class="my-6 flex w-full flex-col gap-3 md:my-8">
      <div class="bg-primary-200 w-32 animate-pulse rounded-md border p-4"></div>
      <div
        v-for="i in [1, 2, 3, 4]"
        :key="i"
        class="bg-primary-50 w-full animate-pulse rounded-md border p-5"
      >
        <div class="flex-1 space-y-6">
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-primary-200 col-span-1 h-2 rounded-full"></div>
          </div>

          <div class="bg-primary-200 col-span-1 h-2 rounded-full"></div>
        </div>
      </div>
    </div>

    <div v-else>
      <div v-if="allLinks.length > 0">
        <p class="text-primary-600 dark:text-primary-200 mt-6 py-3 font-medium uppercase">
          My Links
        </p>

        <div class="space-y-6 lg:space-y-4">
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
            @edit-link="openEditLinkPanel(link)"
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
          <Paginator
            :is-first-page="isFirstPage"
            :is-last-page="isLastPage"
            :current-page="currentPage"
            :page-count="pageCount"
            @next-page="next"
            @prev-page="prev"
          />
        </div>
      </div>

      <div
        v-else
        class="bg-primary-50 dark:border-primary-700 dark:bg-primary-900 relative my-6 flex h-64 w-full flex-col items-center justify-center space-y-4 rounded border px-4 py-6"
      >
        <icon name="ph:link-break" size="44" class="dark:text-primary-400 opacity-50" />
        <p class="dark:text-primary-200 mb-1 mt-4 font-medium">No Links</p>
        <p class="text-primary-400 dark:text-primary-500 font-light">
          Get started by creating a new link.
        </p>

        <u-button size="lg" trailing-icon="i-tabler-plus" @click="showCreateLinkPanel = true">
          Add link
        </u-button>
      </div>
    </div>
  </section>
</template>
