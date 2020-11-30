
<template>
   <button
             
              class="btn"
              :class="{ btndark: $vuetify.theme.dark }"
              x-large
              rounded
              :ripple="false"
              type="submit"
              v-on:keyup.enter="sub"
              @click="sub"
            >
              <div class="shortenSpinner"></div>
            </button>
</template>

<script>
</script>

<style>
</style>