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
        text:"#000",
        navbarColor:"#fff",
        footerColor:"#fff",
        bgColor:"#fff",
        btnn:"#000"
      },
      dark: {
        svgColor: "#fff",
        text:"#fff",
        navbarColor:"#000",
        footerColor:"#000",
        bgColor:"#000",
        btnn:"#fff"
      },
    },
  },
});

export default vuetify;
