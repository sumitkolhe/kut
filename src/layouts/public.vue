<script lang="ts" setup>
import AppHeader from 'components/organisms/app-header.vue'
import AppFooter from 'components/organisms/app-footer.vue'
</script>

<template>
  <main>
    <app-header />
    <NuxtLoadingIndicator color="#f55" :height="3" />
    <!-- <div class="bg"></div> -->
    <slot />

    <app-footer />
  </main>
</template>

<style scoped>
.bg {
  height: -moz-fit-content;
  height: fit-content;
  background-image: radial-gradient(at 27% 37%, #3a8bfd 0, transparent 0),
    radial-gradient(at 97% 21%, #72fe7d 0, transparent 50%),
    radial-gradient(at 52% 99%, #fd3a4e 0, transparent 50%),
    radial-gradient(at 10% 29%, #855afc 0, transparent 50%),
    radial-gradient(at 97% 96%, #e4c795 0, transparent 50%),
    radial-gradient(at 33% 50%, #8ca8e8 0, transparent 50%),
    radial-gradient(at 79% 53%, #eea5ba 0, transparent 50%);
  position: absolute;
  content: '';
  width: 100%;
  z-index: 0;
  height: 100%;
  filter: blur(100px) saturate(150%);
  opacity: 0.1;
}
</style>
