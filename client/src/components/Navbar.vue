<template>
  <nav>
    <!-- APPBAR -->
    <v-app-bar :height="height" color="#fff" flat app>
      <!--navigation drawer-->

      <v-btn icon color="black" class="hidden-sm-and-up" @click="drawer=!drawer">
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M6,13H14L10.5,16.5L11.92,17.92L17.84,12L11.92,6.08L10.5,7.5L14,11H6V13Z"
          />
        </svg>
      </v-btn>

      <h2>{{title}}</h2>

      <v-spacer></v-spacer>
      <!--Routes-->
      <div>
        <v-btn
          class="svg-padding"
          v-if="location==true && mobile==false"
          icon
          @click="$router.push('/dashboard'),location=!location"
        >
          <svg viewBox="0 0 24 24">
            <path
              fill="#000"
              d="M13,2.05V5.08C16.39,5.57 19,8.47 19,12C19,12.9 18.82,13.75 18.5,14.54L21.12,16.07C21.68,14.83 22,13.45 22,12C22,6.82 18.05,2.55 13,2.05M12,19A7,7 0 0,1 5,12C5,8.47 7.61,5.57 11,5.08V2.05C5.94,2.55 2,6.81 2,12A10,10 0 0,0 12,22C15.3,22 18.23,20.39 20.05,17.91L17.45,16.38C16.17,18 14.21,19 12,19Z"
            />
          </svg>
        </v-btn>
        <v-btn
          class="hidden-xs-down svg-padding"
          icon
          v-else-if="location==false && mobile==false"
          @click="$router.push('/'),location=!location"
        >
          <svg viewBox="0 0 24 24">
            <path
              fill="#000"
              d="M7,7H11V9H7A3,3 0 0,0 4,12A3,3 0 0,0 7,15H11V17H7A5,5 0 0,1 2,12A5,5 0 0,1 7,7M17,7A5,5 0 0,1 22,12H20A3,3 0 0,0 17,9H13V7H17M8,11H16V13H8V11M17,12H19V15H22V17H19V20H17V17H14V15H17V12Z"
            />
          </svg>
        </v-btn>

        <!--theme-->
        <v-btn v-if="isthemedark==false" @click="isthemedark=!isthemedark" class="svg-padding" icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#000"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </v-btn>
        <v-btn v-else class="svg-padding" @click="isthemedark=!isthemedark" icon>
          <svg viewBox="0 0 24 24">
            <path
              fill="#000"
              d="M3.55,18.54L4.96,19.95L6.76,18.16L5.34,16.74M11,22.45C11.32,22.45 13,22.45 13,22.45V19.5H11M12,5.5A6,6 0 0,0 6,11.5A6,6 0 0,0 12,17.5A6,6 0 0,0 18,11.5C18,8.18 15.31,5.5 12,5.5M20,12.5H23V10.5H20M17.24,18.16L19.04,19.95L20.45,18.54L18.66,16.74M20.45,4.46L19.04,3.05L17.24,4.84L18.66,6.26M13,0.55H11V3.5H13M4,10.5H1V12.5H4M6.76,4.84L4.96,3.05L3.55,4.46L5.34,6.26L6.76,4.84Z"
            />
          </svg>
        </v-btn>

        <v-menu offset-y content-class="modale" dark open-on-click>
          <template v-slot:activator="{ on }">
            <!--about-->
            <v-btn v-on="on" class="svg-padding" icon>
              <svg viewBox="0 0 24 24">
                <path
                  fill="#000"
                  d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                />
              </svg>
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <h3>{{title}}</h3>
                  </v-list-item-title>
                  <v-list-item-subtitle class="subtitle-1">{{version}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <a href="https://github.com/sumitkolhe/Reduced" target="_blank">
                    <v-btn icon>
                      <svg viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                        />
                      </svg>
                    </v-btn>
                  </a>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-item>
                <v-list-tile-title>Server Status</v-list-tile-title>
                <v-badge class="ml-12" :content="content" inline :color="color"></v-badge>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <!-- NAVIGATION DRAWER  -->
    <v-navigation-drawer
      mobile-breakpoint="100000"
      width="350"
      v-model="drawer"
      app
      fixed
      floating
      clipped
    >
      <v-list flat>
        <v-list-item-group active-class="active">
          <v-list-item class="card" @click="$router.push('/')">
            <v-list-item-content>
              <v-list-item-title class="text">Home</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon class="image">
              <svg viewBox="0 0 24 24">
                <path
                  fill="#000"
                  d="M7,7H11V9H7A3,3 0 0,0 4,12A3,3 0 0,0 7,15H11V17H7A5,5 0 0,1 2,12A5,5 0 0,1 7,7M17,7A5,5 0 0,1 22,12H20A3,3 0 0,0 17,9H13V7H17M8,11H16V13H8V11M17,12H19V15H22V17H19V20H17V17H14V15H17V12Z"
                />
              </svg>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item class="card" @click="$router.push('/dashboard')">
            <v-list-item-content>
              <v-list-item-title class="text">Dashboard</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon class="image">
              <svg viewBox="0 0 24 24">
                <path
                  fill="#000"
                  d="M13,2.05V5.08C16.39,5.57 19,8.47 19,12C19,12.9 18.82,13.75 18.5,14.54L21.12,16.07C21.68,14.83 22,13.45 22,12C22,6.82 18.05,2.55 13,2.05M12,19A7,7 0 0,1 5,12C5,8.47 7.61,5.57 11,5.08V2.05C5.94,2.55 2,6.81 2,12A10,10 0 0,0 12,22C15.3,22 18.23,20.39 20.05,17.91L17.45,16.38C16.17,18 14.21,19 12,19Z"
                />
              </svg>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="feedback d-lg-none">
          <v-btn icon @click="drawer= !drawer">
            <svg
              viewBox="0 0 24 24"
              width="32"
              height="32"
              stroke="#2c2b2b"
              stroke-width="2.5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import api from "../api";

export default {
  name: "Navbar",
  components: {},
  computed: {
    height() {
      if (this.$vuetify.breakpoint.xs) return 65;
      else return 80;
    },
    mobile() {
      if (this.$vuetify.breakpoint.xs) return true;
      else return false;
    }
  },

  data() {
    return {
      title: process.env.VUE_APP_TITLE,
      version: process.env.VUE_APP_VERSION,
      content: "OFFLINE",
      color: "error",
      response: null,
      location: true,
      drawer: false,
      isthemedark: false
    };
  },
  async mounted() {
    this.response = await api.getstatus();

    if (this.response.status == 200 && this.response.data.status == "OK") {
      this.content = "ONLINE";
      this.color = "success";
    }
  }
};
</script>

<style scoped>
.modale {
  font-size: 16px;
  font-weight: 500;
  border-radius: 0.5rem;
}
.card {
  margin: 1rem 1.5rem;
  font-weight: 600;
  padding: 0.8rem 1.8rem;
}

.feedback {
  text-align: center;
  margin: 1rem;
}

a {
  text-decoration: none;
}

.about {
  border-radius: 2rem;
}
.active {
  background-color: #f1f1f1;
  border-radius: 1rem;
}

.text {
  font-size: 18px;
  font-weight: 600;
  color: #000000 !important;
}

.image {
  padding: 0.7rem;
  border-radius: 1rem;
  background-color: #f1f1f1;
}

h2 {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 0px;
  color: #000;
  margin: 0rem 1rem;
}

svg {
  height: 36px;
  width: 36px;
}

.svg-padding {
  margin: 0rem 1rem;
}

@media screen and (max-width: 600px) {
  h2 {
    font-size: 1.8rem;
    font-weight: 800;
    letter-spacing: 0px;
    color: #000;
    margin: 0rem 1rem;
  }

  svg {
    height: 32px;
    width: 32px;
  }

  .svg-padding {
    margin: 0rem 0.2rem;
  }
}
</style>
