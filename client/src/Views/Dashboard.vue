<template>
  <v-container class="body" fluid>
    <!--Heading for create links  lg md sm xs -->
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="10" xl="8" class="mt-2 mt-md-8">
        <v-row justify="center" class="mb-6 mt-2 mt-lg-0 mt-md-0 mx-1" align="center" wrap>
          <h1 style="font-size:32px; font-weight:700;font-family: " color="black">&#128075; Hey</h1>
        </v-row>
        <v-row justify="center" class="mb-6 mx-1" align="center" wrap>
          <h1
            style="font-size:22px; font-weight:500;font-family: "
            color="black"
          >Enter a link to check its details</h1>
        </v-row>

        <!--FULL URL box -->
        <v-row justify="center" class="mx-1" align="center">
          <v-col cols="12" sm="10" md="10" lg="8" xl="8">
            <input
              class="urlbox"
              :class="{'badinfo':badurl, 'urlboxdark':$vuetify.theme.dark}"
              v-model="staturl"
              :placeholder="placeholder"
              v-on:keyup.enter="staturl"
              type="text"
            />
          </v-col>
        </v-row>

        <!--Check button -->
        <v-row justify="center" class="mt-md-0 mt-sm-0" align="center" dense>
          <button
            class="btn"
            :class="{'btndark':$vuetify.theme.dark}"
            x-large
            rounded
            :ripple="false"
            type="submit"
            v-on:keyup.enter="getstats"
            @click="getstats"
          >{{buttonstatus}}</button>
        </v-row>

        <!--Detailed Statistics-->

        <v-row v-if="createdon!=''" class="mt-10 justify-space-around">
          <v-col cols="12" sm="6" md="6" lg="3" xl="3">
            <v-sheet class="mx-auto card">
              <svg style="width:32px;height:32px" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"
                />
              </svg>
              <v-card-title>
                <span class="mx-auto card-title">Created on</span>
              </v-card-title>
              <v-card-text class="card-info">{{createtime}} | {{createdon}}</v-card-text>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="6" md="6" lg="3" xl="3">
            <v-sheet class="mx-auto card">
              <svg style="width:32px;height:32px" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M8,15A2,2 0 0,1 6,13A2,2 0 0,1 8,11A2,2 0 0,1 10,13A2,2 0 0,1 8,15M10.5,17L12,14L13.5,17H10.5M16,15A2,2 0 0,1 14,13A2,2 0 0,1 16,11A2,2 0 0,1 18,13A2,2 0 0,1 16,15M22,11A10,10 0 0,0 12,1A10,10 0 0,0 2,11C2,13.8 3.2,16.3 5,18.1V22H19V18.1C20.8,16.3 22,13.8 22,11M17,20H15V18H13V20H11V18H9V20H7V17.2C5.2,15.7 4,13.5 4,11A8,8 0 0,1 12,3A8,8 0 0,1 20,11C20,13.5 18.8,15.8 17,17.2V20Z"
                />
              </svg>
              <v-card-title>
                <span class="mx-auto card-title">Expiration Date</span>
              </v-card-title>
              <v-card-text class="card-info">{{expiretime}} | {{expiredate}}</v-card-text>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="6" md="6" lg="3" xl="3">
            <v-sheet class="mx-auto card">
              <svg style="width:32px;height:32px" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M10.76,8.69A0.76,0.76 0 0,0 10,9.45V20.9C10,21.32 10.34,21.66 10.76,21.66C10.95,21.66 11.11,21.6 11.24,21.5L13.15,19.95L14.81,23.57C14.94,23.84 15.21,24 15.5,24C15.61,24 15.72,24 15.83,23.92L18.59,22.64C18.97,22.46 19.15,22 18.95,21.63L17.28,18L19.69,17.55C19.85,17.5 20,17.43 20.12,17.29C20.39,16.97 20.35,16.5 20,16.21L11.26,8.86L11.25,8.87C11.12,8.76 10.95,8.69 10.76,8.69M15,10V8H20V10H15M13.83,4.76L16.66,1.93L18.07,3.34L15.24,6.17L13.83,4.76M10,0H12V5H10V0M3.93,14.66L6.76,11.83L8.17,13.24L5.34,16.07L3.93,14.66M3.93,3.34L5.34,1.93L8.17,4.76L6.76,6.17L3.93,3.34M7,10H2V8H7V10"
                />
              </svg>
              <v-card-title>
                <span class="mx-auto card-title">Total Clicks</span>
              </v-card-title>
              <v-card-text class="card-info">{{totalclicks}}</v-card-text>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="6" md="6" lg="3" xl="3">
            <v-sheet class="mx-auto card">
              <svg style="width:32px;height:32px" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                />
              </svg>
              <v-card-title>
                <span class="mx-auto card-title">Orignal link</span>
              </v-card-title>
              <v-card-text class="card-info">
                <a :href="originallink" target="_blank">{{originallink}}</a>
              </v-card-text>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!--SNACKBARS-->
    <div>
      <v-snackbar timeout="3000" color="red" elevation="24" top v-model="aliasdoesnotexist" rounded="pill">
        <h3 class="text-center">Invalid Link</h3>
      </v-snackbar>
    </div>
    <div>
      <v-snackbar timeout="3000" color="red" elevation="24" top v-model="limitReached" rounded="pill">
        <h3 class="text-center">Quota Exceeded</h3>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import api from "../controller/controller";
export default {
  name: "Dashboard",
  components: {},

  data() {
    return {
      staturl: "",
      url: "",
      originallink: "",
      totalclicks: "",
      createdon: "",
      createtime: "",
      expiredate: "",
      expiretime: "",
      placeholder: "Enter a shortened link",
      response: "",
      date: "",
      limitReached: false,
      statdate: "",
      buttonstatus: "Check",
      badurl: false,
      aliasdoesnotexist: false,
      value: [],
      labels: [],
      store: [],
      gradient: ["#00c6ff", "#F0F", "#FF0"]
    };
  },

  methods: {
    async getstats() {
      this.createdon = "";
      this.totalclicks = "";
      this.originallink = "";
      this.createtime = "";
      this.expiredate = "";
      this.expiretime = "";
      this.badurl = false;
      this.value = [];
      this.labels = [];
      this.store = [];

      if (this.staturl != "") {
        this.buttonstatus = "Checking..";
        this.response = await api.getURL(this.staturl);

        if (this.response.status == 200) {
          this.date = new Date(this.response.data.created);
          this.expire = new Date(this.response.data.expire);
          this.createdon = this.date.toDateString();
          this.createtime = this.response.data.created.match(/\d\d:\d\d/)[0];
          this.expiretime = this.response.data.expire.match(/\d\d:\d\d/)[0];
          this.totalclicks = this.response.data.clicks;
          this.originallink = this.response.data.longurl;
          this.expiredate = this.expire.toDateString();
          for (var i = 0; i < this.response.data.stats.length; i++) {
            this.statdate = new Date(this.response.data.stats[i]);
            this.store[i] =
              this.statdate.getUTCDate() +
              "-" +
              this.statdate.getUTCMonth() +
              "-" +
              this.statdate.getUTCFullYear();
          }
          var result = this.graph(this.store);
          this.labels = result[0]; //labels for the graph
          this.value = result[1];
          console.log(this.response.data.stats.length);
        } else if (this.response.status == 404) {
          this.aliasdoesnotexist = true;
        } else if (this.response.status == 400) {
          this.badurl = true;
          this.staturl = "";
          this.placeholder = "Not a valid link";
        } else if (this.response.status == 429) {
          this.limitReached = true;
        }
      }
      this.buttonstatus = "Check";
    },

    graph(arr) {
      var a = [],
        b = [],
        prev;

      arr.sort();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
          a.push(arr[i]);
          b.push(1);
        } else {
          b[b.length - 1]++;
        }
        prev = arr[i];
      }
      return [a, b];
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
/* visited link */
a:visited {
  color: #c5c5c5;
}

.card {
  padding-top: 1.5rem;
  border-radius: 1.5rem;
  min-width: 15ch;
  max-width: 300px;
  min-height: 230px;
  text-align: center;
  background-color: #202020;
}
.card-title {
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  color: #ffffff;
}
.card-info {
  font-size: 18px;
  font-weight: 600;
  margin-top: 0.5rem;
  padding: 0 1.2rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.527);
}
</style>