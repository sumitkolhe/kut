<template>
  <v-main class="root">
    <v-app-bar class="pt-2" elevation="0" height="100" color="accent">
      <v-spacer></v-spacer><img class="mb-6" src="~/assets/banner-light.svg" />
      <v-spacer></v-spacer>

      <Nuxtlink to="auth/login">Login</Nuxtlink>

      <v-btn text class="font-weight-bold">Register</v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>

    <div class="hero">
      <v-row justify="center">
        <div class="main-title">
          Shorten your links quickly
          <svg
            data-v-55d53dfe=""
            viewBox="0 0 24 24"
            width="60"
            height="60"
            stroke="currentColor"
            stroke-width="2"
            fill="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="vertical-align: middle"
          >
            <polygon
              data-v-55d53dfe=""
              points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
            ></polygon>
          </svg>
        </div>
      </v-row>
      <v-row justify="center">
        <div class="sub-title">
          A URL shortener built with powerful tools to help you grow and protect
          your brand.
        </div>
      </v-row>
    </div>
    <img src="~/assets/wave.svg" />
    <div class="body">
      <v-row>
        <v-col align="center"
          >Create, protect and delete your links and monitor them with detailed
          statistics.</v-col
        >
        <v-col align="center"><img src="~/assets/banner-light.svg" /></v-col>
      </v-row>
      <v-row>
        <v-col align="center"><img src="~/assets/banner-light.svg" /></v-col>
        <v-col align="center"
          >Completely open source and free. You can host it on your own
          server.</v-col
        >
      </v-row>
      <v-row>
        <v-col align="center">Inspire trust</v-col>
        <v-col align="center"><img src="~/assets/banner-light.svg" /></v-col>
      </v-row>
      <v-card color="#ff5050" class="pa-6 my-8" rounded="xl" height="300px">
        <v-row justify="center" align="center">
          <v-col align="center" class="pa-8 px-12">
            <v-row>
              <p class="text-h4 text--white font font-weight-bold">
                Its free & open-source
              </p></v-row
            >
            <v-row>
              <p class="text-h6">Contribute to Reduced</p>
            </v-row>

            <v-row><v-btn>Contribute</v-btn></v-row>
          </v-col>
          <v-col justify="center" align="center">
            <img src="~/assets/github.png"
          /></v-col>
        </v-row>
      </v-card>
    </div>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'public',
})
</script>

<style scoped>
.root {
  background-color: #fff;
}
.hero {
  padding-top: 80px;
  background-color: #ff5050;
  text-align: center;
}

.body {
  max-width: 960px;
  margin: 0px auto;
}

.main-title {
  font-size: 64px;
  font-weight: 700;
  max-width: 700px;
  letter-spacing: 3px;
  opacity: 95%;
}

.sub-title {
  padding-top: 12px;
  font-size: 22px;
  font-weight: 400;
  max-width: 600px;
  opacity: 70%;
}
</style>