<template>
  <v-container fluid class="px-xl-12 px-lg-10 px-md-10 px-sm-10 px-cols-4 body">
    <v-row justify="center" class="mt-xl-10 mt-lg-10 mt-md-8 mt-sm-6 mt-cols-6">
      <v-col justify="center" cols="12" sm="12" md="10" lg="8" xl="8">
        <v-sheet justify="center" color="#f1f1f1" class="sheet">
          <v-row>
            <v-col align="center" cols="12" sm="12" md="12" lg="12" xl="12">
              <h1 class="mb-0">&#128075; Hey,</h1>
            </v-col>
          </v-row>

          <v-row>
            <v-col align="center" cols="12" sm="12" md="12" lg="12" xl="12">
              <h2 class="mb-0 mx-2 font-weight-medium">Enter the link to get its statistics</h2>
            </v-col>
          </v-row>

          <v-row>
            <v-col align="center" cols="12" sm="12" md="12" lg="12" xl="12">
              <input
                class="urlbox"
                :class="{badurl:badurl}"
                :placeholder="placeholder"
                v-model="staturl"
                v-on:keyup.enter="getstats"
              />

              <button
                type="submit"
                @click="getstats"
                v-on:keyup.enter="getstats"
                class="btn"
              >{{buttonstatus}}</button>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>

      <!-- GRAPH
      <v-col>
        
        <v-sheet class="graphsheet" v-if="value!=''" color="#f1f1f1">
          <v-sparkline
            :labels="labels"
            :value="value"
            :gradient="gradient"
            color="#181818"
            height="93"
            padding="20"
            auto-draw
            auto-draw-duration
            stroke-linecap="round"
            smooth="10"
            show-labels
            line-width="2"
          >
            <template class="graphfont" v-slot:label="item">{{ item.value }}</template>
          </v-sparkline>
        </v-sheet>
     
      </v-col>
      -->
    </v-row>

    <v-spacer></v-spacer>

    <!--Detailed Statistics-->

    <v-row v-if="createdon!=''" class="mt-12 justify-center">
      <v-col cols="12" sm="6" md="6" lg="2" xl="2">
        <v-sheet class="mx-auto stats" dark>
          <v-icon class="info-icons" large>mdi-link-variant-plus</v-icon>
          <v-card-title>
            <span class="mx-auto font-weight-dark card-font">Created on</span>
          </v-card-title>

          <v-card-text class="card-text">{{createdon}}</v-card-text>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="6" md="6" lg="2" xl="2">
        <v-sheet class="mx-auto stats" dark>
          <v-icon class="info-icons" large>mdi-timer-sand</v-icon>
          <v-card-title>
            <span class="mx-auto font-weight-dark card-font">Created time</span>
          </v-card-title>

          <v-card-text class="card-text">{{createtime}}</v-card-text>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="6" md="6" lg="2" xl="2">
        <v-sheet class="mx-auto stats" dark>
          <v-icon class="info-icons" large>mdi-cursor-default-click-outline</v-icon>
          <v-card-title>
            <span class="mx-auto font-weight-dark card-font">Total Clicks</span>
          </v-card-title>

          <v-card-text class="card-text">{{totalclicks}}</v-card-text>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="6" md="6" lg="2" xl="2">
        <v-sheet class="mx-auto stats" dark>
          <v-icon class="info-icons" large>mdi-open-in-new</v-icon>
          <v-card-title>
            <span class="mx-auto font-weight-dark card-font">Orignal link</span>
          </v-card-title>

          <v-card-text class="card-text">
            <a :href="originallink" target="_blank">{{originallink}}</a>
          </v-card-text>
        </v-sheet>
      </v-col>
    </v-row>

    <div>
      <v-snackbar
        color="info"
        bottom
        multi-line
        class="copied-snackbar"
        v-model="aliasdoesnotexist"
        timeout="3000"
      >
        Link does not exist!
        <v-icon color="white" right>mdi-link-off</v-icon>
      </v-snackbar>
    </div>
    <div>
      <v-snackbar
        color="error"
        multi-line
        class="copied-snackbar"
        v-model="limit"
        bottom
        timeout="3000"
      >
        Quota exceeded!
        <v-icon color="white" right>mdi-alert</v-icon>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import api from "../api";
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
      placeholder: "Enter a shortened link",
      response: "",
      date: "",
      limit: "",
      statdate: "",
      sample: [],
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
      this.badurl = false;
      this.value = [];
      this.labels = [];
      this.store = [];

      if (this.staturl != "") {
        this.buttonstatus = "Checking..";
        this.response = await api.getURL(this.staturl);

        if (this.response.status == 200) {
          this.date = new Date(this.response.data.created);
          this.createdon = this.date.toDateString();
          this.createtime = this.response.data.created.match(/\d\d:\d\d/)[0];
          this.totalclicks = this.response.data.clicks;
          this.originallink = this.response.data.longurl;

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
        } else if (this.response.status == 404) {
          this.aliasdoesnotexist = true;
        } else if (this.response.status == 400) {
          this.badurl = true;
          this.staturl = "";
          this.placeholder = "Not a valid link";
        } else if (this.response.status == 429) {
          this.limit = true;
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
* {
  font-family: "Montserrat", sans-serif;
}
.body {
  overflow: hidden;
}

a {
  text-decoration: none;
}
/* visited link */
a:visited {
  color: white;
}

a:link {
  color: #fff;
}

/* selected link */
a:active {
  color: white;
}
.card-text {
  font-size: large;
  font-weight: 700;
  margin-top: 0.5rem;
  padding: 0 1.2rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.graphfont {
  font-weight: 900;
}

.copied-snackbar {
  color: white;
  font-size: large;
  font-weight: 700;
  margin-bottom: 5rem;
}
.card-font {
  font-weight: 500;
  letter-spacing: 1px;
  text-align: center;
  color: #969696;
}
::placeholder {
  font-weight: 900;
}
.style {
  display: inline-block;
}
.sheet {
  padding: 1.5rem 1rem;
  border-radius: 1.5rem;
  margin-top: 1rem;
}

.graphsheet {
  padding: 1.5rem 1rem;
  border-radius: 1.5rem;
  min-height: 93px;
}

.info-icons {
  color: #969696;
  margin-bottom: -5px;
}

.stats {
  padding-top: 1.5rem;
  border-radius: 1.5rem;
  min-width: 15ch;
  max-width: 300px;
  min-height: 230px;
  text-align: center;
}

.urlbox {
  border-radius: 0.75rem;
  margin: 0rem 0.5rem 1.5rem 0.5rem;
  min-width: fit-content;
  border: 0.2rem solid #d6d6d6;
  outline: none;
  font-weight: bolder;
  font-size: large;
  padding: 1rem 1rem;
  line-height: 1.5rem;
  -webkit-appearance: none;
}

.badurl {
  border: 0.2rem solid #f55;
  box-shadow: 0 0 10px #f55;
}

::placeholder {
  font-weight: 600;
}

.urlbox:focus {
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
}

h2 {
  color: #424242;
  font-weight: 400;
}

.btn:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 1);
}
.btn {
  -webkit-appearance: none;
  -moz-appearance: none;
  margin-left: 0.4rem;
  padding: 0.8rem 1.5rem 0.8rem 1.5rem;
  border-radius: 1.6rem;
  font-size: larger;
  background-color: #000;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  transition: all 0.1s ease;
  outline: none;
  font-weight: 600;
  box-shadow: 0 0 0 2px #f1f1f1;
}
</style>