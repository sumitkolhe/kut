<template>
  <v-app >
    <Navbar />
    <v-main style="z-index:0;" >
      <vue-particles
        color=#000
        :particleOpacity="0.8"
        :particlesNumber="30"
        shapeType="circle"
        :particleSize="3"
        linesColor="#2c2b2b"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
      ></vue-particles>

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
export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  computed: {
    particlesNumber() {
      if (this.$vuetify.breakpoint.sm) return 100;
      else return 150;
    },

  },

  data() {
    return {
      color: "#000"
    };
  }
};
</script>

<style >
* {
  font-family: "Montserrat", sans-serif;
}
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
