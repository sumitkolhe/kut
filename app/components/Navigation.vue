<template>
  <v-main>
    <v-app-bar :clipped-left="clippedbar" app elevation="0" color="accent">
      <svg
        width="40"
        height="40"
        viewBox="0 0 80 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M40 0L0 40L40 80L80 40L40 0Z" fill="#F55555" />
        <path d="M40 80L0 120V40L40 80Z" fill="#242424" fill-opacity="0.88" />
        <path d="M0 120H80L40 80L0 120Z" fill="#242424" />
      </svg>
      <v-toolbar-title v-text="title" />
      <!--<v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->

      <v-spacer />

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
            <v-icon large>mdi-bell-outline</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in notiItems" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
        <NuxtLink to="/auth/register">
          <v-icon large>mdi-lock</v-icon></NuxtLink
        >
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      permanent
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      floating
    >
      <v-list>
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
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block> Logout </v-btn>
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
      clipped: true,
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
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },

        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
    }
  },
})
</script>

<style>
.list {
  color: aqua;
}
</style> 
