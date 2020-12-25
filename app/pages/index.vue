<template>
  <v-main>
    <v-app-bar class="pt-2" app elevation="0" height="100" color="accent">
      <v-spacer></v-spacer><img class="mb-6" src="~/assets/banner-light.svg" />
      <v-spacer></v-spacer>
      <v-btn text class="font-weight-bold">Login</v-btn>
      <v-btn text class="font-weight-bold">Register</v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>

    <div class="body">
      <div class="heading">
        <p class="title-text font-weight-bold">Shorten your links</p>
        <p class="title-text">quickly</p>
        <p class="subtitle-text">
          Wading through shortcuts, and it’s too hard to remember any? Get those
        </p>
        <p class="subtitle-text">
          keystrokes ingrained in your muscle memory for good.
        </p>
        <input type="email" name="ok" id="" />
      </div>
    </div>
    <img class="mb-6" src="~/assets/wave.svg" />
    <div class="feat">
      <v-row>
        <v-col align="center" justify="center">ok</v-col
        ><v-col align="center" justify="center">ok</v-col>
      </v-row>
      <v-row>
        <v-col align="center" justify="center">ok</v-col
        ><v-col align="center" justify="center">ok</v-col>
      </v-row>
      <v-row>
        <v-col align="center" justify="center">ok</v-col
        ><v-col align="center" justify="center">ok</v-col>
      </v-row>
    </div>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'public',
  middleware: 'guest',
})
</script>

<style scoped>
.body {
  background-color: #ff5050;
}

.title-text {
  text-align: center;
  letter-spacing: 2px;
  font-size: 64px;
  font-weight: 700;
  line-height: 70px;
}

.subtitle-text {
  margin-top: 30px;
  opacity: 70%;
  letter-spacing: -1px;
  text-align: center;
  font-size: 22px;
  line-height: 10px;
}
</style>