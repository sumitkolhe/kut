<template>
  <v-card>
    <v-footer padless inset color="rgba(0, 0, 0, 0)" width="100%">
      <v-col class="text-center" cols="12">
        <strong>
          Made with
          <svg
            class="pr-1 beat"
            style="width:24px;height:24px; vertical-align:middle;"
            viewBox="0 0 24 24"
          >
            <path
              fill="red"
              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
            />
          </svg>
          using
          <svg
            style="vertical-align:middle;"
            width="20px"
            height="20px"
            viewBox="0 0 256 221"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid"
          >
            <g>
              <path
                d="M204.8,0 L256,0 L128,220.8 L0,0 L50.56,0 L97.92,0 L128,51.2 L157.44,0 L204.8,0 Z"
                fill="#41B883"
              />
              <path d="M0,0 L128,220.8 L256,0 L204.8,0 L128,132.48 L50.56,0 L0,0 Z" fill="#41B883" />
              <path
                d="M50.56,0 L128,133.12 L204.8,0 L157.44,0 L128,51.2 L97.92,0 L50.56,0 Z"
                fill="#35495E"
              />
            </g>
          </svg>
        </strong>
      </v-col>
    </v-footer>
  </v-card>
</template>


<script>
export default {
  name: "Footer",
  components: {},
  data() {
    return {};
  }
};
</script>

<style scoped>
a,
a:hover,
a:active,
a:visited {
  color: #000;
  text-decoration: none;
  margin-left: 3px;
}

@keyframes heartbeat {
  0% {
    transform: scale(0.75);
  }
  25% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.75);
  }
  70% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.75);
  }
}
.beat {
  animation: heartbeat 3s infinite;
}
</style>
