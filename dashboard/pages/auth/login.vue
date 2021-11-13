<template>
  <section class="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
    <div class="space-y-6 mt-20">
      <a href="/" title="Go to Kutty Home Page">
        <scissors-icon color="#000" class="h-12 w-12" />
        <span class="sr-only">Kutty Home Page</span>
      </a>
      <div
        class="flex space-x-4"
        v-for="feature in features"
        :key="feature.title"
      >
        <check-in-circle-fill-icon class="h-8 w-8" />

        <div>
          <h2 class="text-xl font-medium text-foreground">
            {{ feature.title }}
          </h2>
          <p class="mt-1 text-accent7">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="space-y-10 mt-20 flex flex-col space-x-10">
      <h2 class="pl-10">Register</h2>
      <zi-input placeholder="Email" v-model="email" size="big"></zi-input>
      <zi-input placeholder="Password" v-model="password"></zi-input>
      <zi-input
        placeholder="Repeat password"
        v-model="repeatPassword"
      ></zi-input>

      <zi-button type="primary" size="huge" @click="loginUser"
        >Submit</zi-button
      >
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      features: [
        {
          title: 'Free account',
          description:
            'Create apps, connect databases and add-on services, and collaborate on your apps, for free.',
        },
        {
          title: 'Free accoun1',
          description:
            'Create apps, connect databases and add-on services, and collaborate on your apps, for free.',
        },
        {
          title: 'Free accoun2',
          description:
            'Create apps, connect databases and add-on services, and collaborate on your apps, for free.',
        },
        {
          title: 'Free accoun3',
          description:
            'Create apps, connect databases and add-on services, and collaborate on your apps, for free.',
        },
      ],
      email: '',
      password: '',
      repeatPassword: '',
    }
  },

  methods: {
    async loginUser() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: 'thesumitkolhe@gmail.com',
            password: 'qwerty123',
          },
        })
        console.log(this.$auth.loggedIn)
      } catch (error) {
        console.error(error)
      }
    },
  },
})
</script>

<style>
.zi-input {
  height: 56px !important;
}
</style>
