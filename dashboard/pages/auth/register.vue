<template>
  <section
    class="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-5xl mx-auto min-h-full"
  >
    <div class="space-y-6 mt-20">
      <a href="/" title="Go to Kutty Home Page">
        <scissors-icon color="#000" class="h-12 w-12" />
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
    <div
      class="absolute z-0 h-full border border-accent2 md:block hidden"
      style="left: 50%"
    ></div>
    <div class="mt-20 flex flex-col space-x-10 mr-12">
      <h2 class="pl-10 mb-12 font-bold">Register</h2>

      <button
        class="
          bg-foreground
          p-4
          text-white
          rounded-lg
          hover:bg-accent7
          mb-6
          inline-flex
          justify-center
        "
      >
        <github-icon class="px-6 -ml-6"></github-icon>
        <span> Continue with Github </span>
      </button>
      <button
        class="
          bg-errorLight
          p-4
          text-white
          rounded-lg
          hover:bg-errorDark
          mb-6
          inline-flex
          justify-center
        "
      >
        <github-icon class="px-6 -ml-6"></github-icon>
        <span> Continue with Google </span>
      </button>
      <zi-input
        placeholder="Email"
        v-model="loginDetails.email"
        size="big"
      ></zi-input>
      <span v-if="1 === 1" class="mt-2">okkk</span>
      <zi-input
        placeholder="Password"
        v-model="loginDetails.password"
        class="mt-6"
      ></zi-input>
      <span class="mb-8 mt-2">okkk</span>
      <zi-button type="success" @click="loginUser">Submit</zi-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

interface Login {
  email: string
  password: string
}

export default Vue.extend({
  auth: 'guest',
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

      loginDetails: {
        email: '',
        password: '',
      } as Login,
    }
  },

  methods: {
    async loginUser() {
      try {
        await this.$auth.loginWith('local', {
          data: this.loginDetails,
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
})
</script>
