<script lang="ts" setup>
import IconButton from 'components/atoms/buttons/icon-button.vue'
import { useLinkStore } from 'store/link.store'
import { useOffsetPagination } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import LinkCard from 'components/molecules/cards/link-card.vue'
import TextInput from 'components/atoms/inputs/text-input.vue'
import PrimaryButton from 'components/atoms/buttons/primary-button.vue'
import linkOptions from 'components/molecules/panels/link-options.vue'
import type { Link } from 'interfaces/link.interface'

definePageMeta({
  middleware: ['verify-user'],
})

// store
const { fetchAllLinks, deleteLink, shortenLink } = useLinkStore()
const { totalCount, allLinks } = storeToRefs(useLinkStore())

onMounted(() => {
  fetchAllLinks(0, 5)
})

// refs
const showAdvancedOptions = ref(false)
const loading = ref(false)
const search = ref('')

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

const createLink = async () => {
  loading.value = true
  await shortenLink(linkPayload).then(() => {
    fetchAllLinks()
  })
  loading.value = false
}

// functions
const deleteSelectedLink = async (alias: string) => {
  await deleteLink(alias)
}

const editLink = async (id: string) => {
  console.log(id)
}

const { currentPage, pageCount, prev, next, isFirstPage, isLastPage } = useOffsetPagination({
  total: totalCount,
  page: 1,
  pageSize: 5,
  onPageChange: ({
    currentPage,
    currentPageSize,
  }: {
    currentPage: number
    currentPageSize: number
  }) => {
    fetchAllLinks((currentPage - 1) * 5, currentPageSize)
  },
})
</script>

<template>
  <section class="my-6 w-full gap-6 md:my-8">
    <div class="relative flex w-full flex-col">
      <div class="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-4">
        <text-input
          v-model="search"
          prefix-icon="ph:magnifying-glass-duotone"
          placeholder="Search..."
        />
        <primary-button
          suffix-icon="ph:plus-duotone"
          :loading="loading"
          class="w-full md:w-36"
          @click="showAdvancedOptions = true"
        >
          Add Link
        </primary-button>
      </div>

      <link-options
        v-model:active="linkPayload.meta.active"
        v-model:alias="linkPayload.alias"
        v-model:description="linkPayload.description"
        v-model:target="linkPayload.target"
        v-model:valid-from="linkPayload.meta.validFrom"
        v-model:valid-till="linkPayload.meta.validTill"
        v-model:password="linkPayload.meta.password"
        v-model:max-visits="linkPayload.meta.maxVisits"
        v-model:open-panel="showAdvancedOptions"
        @create-link="createLink"
      />
    </div>

    <div v-if="allLinks.length > 0">
      <p class="mt-6 py-3 font-medium dark:text-gray-200">My Links</p>

      <div class="space-y-3">
        <link-card
          v-for="(link, index) in allLinks.slice(0, 5)"
          :key="index"
          :alias="link.alias!"
          :description="link.description || ''"
          :target="link.target"
          :short-url="link.shortUrl"
          :visit-count="link.visitCount"
          :created-at="link.createdAt.toString()"
          :updated-at="link.updatedAt.toString()"
          @delete-link="deleteSelectedLink(link.alias!)"
          @edit-link="editLink"
        />
      </div>

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
      <p class="font-light text-gray-400 dark:text-gray-500">Get started by creating a new link.</p>
    </div>
  </section>
</template>
