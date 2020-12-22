<template>
  <v-main>
    <v-app-bar :clipped-left="clippedbar" app elevation="0" color="transparent">
      <!--<v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->

      <v-spacer />

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="accent" dark v-bind="attrs" v-on="on">
            <v-icon large>mdi-bell-outline</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in notiItems" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <NuxtLink to="/auth/register">
        <v-btn text color="accent" dark v-bind="attrs" v-on="on">
          Register
        </v-btn></NuxtLink
      >
      <NuxtLink to="/auth/login">
        <v-btn text color="accent" dark v-bind="attrs" v-on="on">
          Login
        </v-btn></NuxtLink
      >
    </v-app-bar>

    <v-navigation-drawer
      permanent
      v-model="drawer"
      :mini-variant="miniVariant"
      mini-variant-width="100"
      width="300"
      :clipped="clipped"
      fixed
      app
    >
      <div class="navi">
        <v-list nav>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          <v-btn icon @click.stop="miniVariant = !miniVariant">
            <v-icon x-large
              >mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon
            >
          </v-btn>
        </v-list>
      </div>

      <template v-slot:prepend>
        <div class="pa-2">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title"> Reduced </v-list-item-title>
              <v-list-item-subtitle> v2.0 </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </template>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block elevation="0" @click="logout()"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-main>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      on: '',
      attrs: '',
      clipped: false,
      drawer: false,
      clippedbar: false,
      fixed: false,
      miniVariant: false,
      title: 'Reduced',
      notiItems: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      items: [
        {
          icon: 'mdi-link-variant',
          title: 'Shorten',
          to: '/',
        },

        {
          icon: 'mdi-chart-bubble',
          title: 'My Links',
          to: '/links',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Analytics',
          to: '/analytics',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Notes',
          to: '/notes',
        },
      ],
    }
  },

  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
})
</script>

<style>
.v-list {
  margin: 0px 16px !important;
}
</style> 
