import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/router";
import VueClipboard from "vue-clipboard2";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import "./assets/global.css";
Vue.component(VueQrcode.name, VueQrcode);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,

  render: (h) => h(App),
}).$mount("#app");
