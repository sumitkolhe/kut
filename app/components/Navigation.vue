<template>
  <v-main>
    <v-app-bar :clipped-left="clipped" fixed app elevation="0">
      <v-toolbar-title v-text="title" />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
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
    </v-navigation-drawer>
  </v-main>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
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
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Reduced',
    }
  },
})
</script>

<style>
</style> 
