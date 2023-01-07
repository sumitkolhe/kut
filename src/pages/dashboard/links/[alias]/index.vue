<script lang="ts" setup>
import { useLinkStore } from 'store/link.store'
import { storeToRefs } from 'pinia'

definePageMeta({
  middleware: ['auth'],
  layout: 'links',
})

const route = useRoute()

const { fetchLinkByAlias } = useLinkStore()
const { link } = storeToRefs(useLinkStore())

onMounted(() => fetchLinkByAlias(route.params.alias as string))
</script>

<template>
  <section class="my-6">
    <div
      class="grid grid-cols-1 divide-x rounded border bg-gray-50 md:my-8 md:grid-cols-3 lg:grid-cols-4"
    >
      <div class="p-6">ok</div>
      <div class="p-6">ok</div>
      <div class="p-6">ok</div>
      <div class="p-6">ok</div>
      <div class="p-6">ok</div>
      <div class="p-6">ok</div>
      {{ link }}
    </div>
  </section>
</template>
