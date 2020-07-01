// src/plugins/vuetify.js

import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        svgColor: "#000",
        navbarColor: "#fff",
        footerColor: "#fff",
        textColor: "#fff",
        navigationDrawerColor: "#f55555"
      },
      dark: {
        svgColor: "#fff",
        textColor: "#000",
        navbarColor: "#121212",
        footerColor: "#121212",
        navigationDrawerColor: "#212121"
      
      },
    },
  },
});

export default vuetify;
