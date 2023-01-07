<script lang="ts" setup>
import { VFrappeChart } from 'vue-frappe-chart'
import { useLinkStore } from 'store/link.store'

definePageMeta({
  middleware: ['auth'],
  layout: 'links',
})

const route = useRoute()

const { fetchLinkByAlias } = useLinkStore()

onMounted(() => fetchLinkByAlias(route.params.alias as string))
</script>

<template>
  <section class="my-6">
    <client-only>
      <v-frappe-chart
        type="percentage"
        :height="400"
        :labels="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
        :data="[{ values: [18, 40, 30, 35, 8, 52, 17, -4] }]"
      />
    </client-only>
  </section>
</template>
