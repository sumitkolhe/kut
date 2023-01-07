<script lang="ts" setup>
import { VFrappeChart } from 'vue-frappe-chart'
import { useLinkStore } from 'store/link.store'
import { storeToRefs } from 'pinia'

definePageMeta({
  middleware: ['auth'],
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
    </div>
    <client-only>
      {{ link }}
      <v-frappe-chart
        type="percentage"
        height="400"
        :labels="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
        :data="[{ values: [18, 40, 30, 35, 8, 52, 17, -4] }]"
      />
    </client-only>
  </section>
</template>
