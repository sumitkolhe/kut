<script lang="ts" setup>
import { useLinkStore } from 'store/link.store'
import { useOffsetPagination } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import LinkCard from 'components/molecules/cards/link-card.vue'
import LinkPanel from 'components/molecules/panels/link-panel.vue'

// store
const { fetchAllLinks, deleteLink } = useLinkStore()
const { totalCount, allLinks } = storeToRefs(useLinkStore())

// refs
const loaders = reactive({
  allLinksLoader: false,
  deleteLinkLoader: false,
  searchLinksLoader: false,
})
const toggles = reactive({
  showCreateLinkPanel: false,
  showQrCode: false,
})
const search = ref()
const qrCode = ref()

onMounted(async () => {
  loaders.allLinksLoader = true
  await fetchAllLinks(0, 5)
  loaders.allLinksLoader = false
})

// functions
const debouncedSearch = useDebounceFn(async () => {
  loaders.searchLinksLoader = true
  await fetchAllLinks(0, 5, search.value)
  loaders.searchLinksLoader = false
}, 500)

const deleteSelectedLink = async (alias: string | null) => {
  if (alias) await deleteLink(alias)
}

const { currentPage, prev, next, currentPageSize } = useOffsetPagination({
  total: totalCount,
  page: 1,
  pageSize: 5,
  onPageChange: async ({ currentPage, currentPageSize }) => {
    loaders.allLinksLoader = true
    await fetchAllLinks((currentPage - 1) * 5, currentPageSize)
    loaders.allLinksLoader = false
  },
})

const showQrCode = (url: string) => {
  qrCode.value = url
  toggles.showQrCode = true
}

const { copy, copied, text } = useClipboard({ legacy: true })

watch(copied, (clicked) => {
  if (clicked) createToast(`${text.value} copied to clipboard`, { type: 'success' })
})
</script>

<template>
  <section class="my-6 w-full gap-6 md:my-8">
    <!-- link search  -->
    <div class="flex w-full flex-row space-x-3">
      <u-input
        v-model="search"
        class="w-full"
        size="xl"
        type="email"
        :loading="loaders.searchLinksLoader"
        placeholder="Search..."
        icon="i-tabler-search"
        @update:model-value="debouncedSearch"
      />

      <u-button trailing-icon="i-tabler-plus" @click="toggles.showCreateLinkPanel = true">
        Add link
      </u-button>
    </div>

    <link-panel v-model:open-panel="toggles.showCreateLinkPanel" />

    <!-- links skeleton loaders -->
    <div v-if="loaders.allLinksLoader" class="my-6 flex w-full flex-col gap-3 md:my-8">
      <u-skeleton class="h-8 w-32" />
      <div
        v-for="i in [1, 2, 3, 4, 5]"
        :key="i"
        class="bg-primary-50 dark:bg-primary-700 dark:border-primary-500 w-full animate-pulse rounded-md border p-5"
      >
        <div class="flex-1 space-y-6">
          <u-skeleton class="h-2 w-full" />
          <u-skeleton class="h-2 w-full" />
        </div>
      </div>
    </div>

    <!-- all links  -->
    <div
      v-else-if="allLinks.length > 0 && !loaders.allLinksLoader"
      class="bg-primary-50 dark:bg-primary-900 dark:border-primary-700 mt-8 rounded-md border"
    >
      <div class="dark:border-primary-700 flex flex-row items-center justify-between border-b p-3">
        <p class="text-primary-700 dark:text-primary-300 font-medium">My Links</p>
        <div>
          <u-dropdown
            :items="[
              [
                {
                  label: 'Name',
                  icon: 'i-tabler-abc',
                  click: () => {
                    console.log('Edit')
                  },
                },
                {
                  label: 'Date',
                  icon: 'i-tabler-calendar',
                  click: () => {
                    console.log('Edit')
                  },
                },
                {
                  label: 'Views',
                  icon: 'i-tabler-list-numbers',
                  click: () => {
                    console.log('Edit')
                  },
                },
              ],
            ]"
            :popper="{ placement: 'bottom-end' }"
          >
            <u-button color="white" label="Filter By" trailing-icon="i-tabler-chevron-down" />
          </u-dropdown>
        </div>
      </div>

      <div class="my-6 space-y-6 px-4 py-0 lg:space-y-4">
        <link-card
          v-for="link in allLinks.slice(0, 5)"
          :key="link.alias?.toString()"
          :link="link"
          @copy-link="copy(link.shortUrl)"
          @delete-link="deleteSelectedLink(link.alias)"
          @qr-code="showQrCode"
        />
      </div>

      <div
        class="dark:border-primary-700 flex flex-row items-center justify-center border-t p-6 md:justify-end"
      >
        <u-pagination
          v-model="currentPage"
          :inactive-button="{ color: 'gray' }"
          size="md"
          :page-count="currentPageSize"
          :total="totalCount"
          @next-button="next"
          @prev-button="prev"
        />
      </div>
    </div>

    <!-- add link section  -->
    <div
      v-else
      class="bg-primary-50 dark:border-primary-700 dark:bg-primary-900 relative my-6 flex h-64 w-full flex-col items-center justify-center space-y-4 rounded border px-4 py-6"
    >
      <icon name="ph:link-break" size="44" class="dark:text-primary-400 opacity-50" />
      <p class="dark:text-primary-200 mb-1 mt-4 font-medium">No Links</p>
      <p class="text-primary-400 dark:text-primary-500 font-light">
        Get started by creating a new link.
      </p>

      <u-button size="lg" trailing-icon="i-tabler-plus" @click="toggles.showCreateLinkPanel = true">
        Add link
      </u-button>
    </div>
  </section>
</template>
