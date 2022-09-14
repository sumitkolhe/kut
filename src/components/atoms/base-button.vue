<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
    required: false,
  },
})
</script>

<template>
  <button
    :disabled="props.disabled || props.loading"
    type="button"
    class="inline-flex w-full disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300 disabled:border-gray-200 cursor-pointer tracking-wide select-none appearance-none items-center justify-center rounded-md border border-gray-200 bg-gray-900 px-3 py-2 text-white transition hover:border-black hover:text-black hover:bg-white focus:outline-none active:bg-gray-100"
    v-bind="$attrs"
  >
    <svg v-if="loading" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 2400">
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="180">
        <path d="M1200 600V100" />
        <path d="M1200 2300v-500" opacity=".5" />
        <path d="m900 680.4-250-433" opacity=".917" />
        <path d="m1750 2152.6-250-433" opacity=".417" />
        <path d="m680.4 900-433-250" opacity=".833" />
        <path d="m2152.6 1750-433-250" opacity=".333" />
        <path d="M600 1200H100" opacity=".75" />
        <path d="M2300 1200h-500" opacity=".25" />
        <path d="m680.4 1500-433 250" opacity=".667" />
        <path d="m2152.6 650-433 250" opacity=".167" />
        <path d="m900 1719.6-250 433" opacity=".583" />
        <path d="m1750 247.4-250 433" opacity=".083" />
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          begin="0s"
          calcMode="discrete"
          dur="1s"
          keyTimes="0;0.08333;0.16667;0.25;0.33333;0.41667;0.5;0.58333;0.66667;0.75;0.83333;0.91667"
          repeatCount="indefinite"
          type="rotate"
          values="0 1199 1199;30 1199 1199;60 1199 1199;90 1199 1199;120 1199 1199;150 1199 1199;180 1199 1199;210 1199 1199;240 1199 1199;270 1199 1199;300 1199 1199;330 1199 1199"
        />
      </g>
    </svg>
    <!-- <Icon v-if="loading" name="line-md:loading-twotone-loop" size="24" /> -->
    <p class="pl-4"><slot /></p>
  </button>
</template>
