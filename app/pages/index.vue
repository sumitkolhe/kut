<template>
  <v-row justify="center" align="center">
    Hello
    <Snackbar></Snackbar>
  </v-row>
</template>

<script>
import Footer from '../components/footer.vue'
import Snackbar from '../components/snackbar.vue'
export default {
  components: { Snackbar, Footer },
}
</script>
