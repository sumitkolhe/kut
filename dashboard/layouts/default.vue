<template>
  <v-app dark :style="{ background: $vuetify.theme.themes[theme].foreground }">
    <v-main>
      <CommonHeader />
      <v-divider v-if="!$auth.loggedIn"></v-divider>
      <div v-if="$auth.loggedIn">
        <CommonNavigation />
        <v-divider></v-divider>
      </div>
      <v-container class="home">
        <Nuxt />
      </v-container>
    </v-main>

    <div v-if="showSpinner" class="splash-screen">
      <div class="spinner-wrapper">
        <div class="loader"></div>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import '@nuxtjs/auth-next'
import {
  computed,
  ComputedRef,
  defineComponent,
  useContext,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const showSpinner = ref(true)

    const context = useContext()
    const theme: ComputedRef<string> = computed<string>(() =>
      context.$vuetify.theme.dark ? 'dark' : 'light'
    )

    onMounted(() => {
      showSpinner.value = false
    })

    return {
      theme,
      showSpinner,
    }
  },
})
</script>

<style scoped>
#app {
  font-family: 'Inter', sans-serif;
}

.home {
  max-width: 1024px;
  margin: 0 auto;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #808080;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.splash-screen {
  background: #fafafa;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 50;
}

.spinner-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
}
</style>
