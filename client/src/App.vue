<template>
  <v-app>
    <Navbar @toggle="renderComponent" />
    <v-main style="z-index:0;">
      <Particles :key="render" />
      <transition name="fade" mode="out-in">
        <router-view style="z-index:999;" />
      </transition>
    </v-main>

    <Footer app></Footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    Particles
  },
  data() {
    return {
      render: 1
    };
  },
  methods: {
    renderComponent() {
      this.render += 1;
    }
  }
};
</script>

<style >
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(1);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
</style>
