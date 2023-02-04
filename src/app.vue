<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<style>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.2s ease;
}

.fade-in-enter-from {
  opacity: 0;
}
.fade-in-leave-to {
  opacity: 0;
}
</style>
