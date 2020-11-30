<template>
  <div class="body">
    <!--Fluid needs to be addedd to make the padding remain constant-->
    <v-container fluid>
      <!--Heading for create links  lg md sm xs -->
      <v-row justify="center" color="bgColor">
        <v-col cols="12" sm="10" md="8" lg="8" xl="6" class="mt-2 mt-md-12">
          <v-row
            justify="center"
            class="mb-8 mt-2 mt-lg-2 mt-md-0 mx-1"
            align="center"
            wrap
          >
            <h1 style="font-size: 22px; font-weight: 500" color="black">
              Create short links quickly
              <svg
                style="vertical-align: middle"
                viewBox="0 0 24 24"
                width="26"
                height="26"
                stroke="currentColor"
                stroke-width="2"
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </h1>
          </v-row>

          <!--FULL URL box -->
          <v-row justify="center" dense class="mx-1" align="center">
            <input
              class="urlbox"
              :class="{ badinfo: badurl, urlboxdark: $vuetify.theme.dark }"
              v-model="longurl"
              :placeholder="urlplaceholder"
              v-on:keyup.enter="sub"
              type="text"
            />
          </v-row>

          <!--Alias box -->
          <v-row
            justify="center"
            class="mx-1 mx-sm-6 mx-md-12"
            align="center"
            dense
          >
            <input
              class="urlbox"
              :class="{ badinfo: badalias, urlboxdark: $vuetify.theme.dark }"
              :placeholder="aliasplaceholder"
              v-model="alias"
              type="text"
            />
          </v-row>

          <!--Submit button -->
          <v-row justify="center" class="mt-md-4 mt-sm-0" align="center" dense>
            <button
              v-if="!loading"
              class="btn"
              :class="{ btndark: $vuetify.theme.dark }"
              x-large
              rounded
              :ripple="false"
              type="submit"
              v-on:keyup.enter="sub"
              @click="sub"
            >
              {{ buttonstatus }}
            </button>

            <button
              v-else
              class="btn"
              :class="{ btndark: $vuetify.theme.dark }"
              x-large
              rounded
              :ripple="false"
              type="submit"
              v-on:keyup.enter="sub"
              @click="sub"
            >
              <div class="shortenSpinner"></div>
            </button>
          </v-row>

          <!--LocalStorage Links-->
          <v-row
            justify="center"
            dense
            class="mx-1"
            align="center"
            v-if="local != ''"
          >
            <table class="table">
              <thead>
                <tr>
                  <th>Orignal</th>
                  <th>Shortened</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(local, index) in local" :key="index">
                  <td data-label="Original">
                    <div>
                      <p>{{ local.link.longurl }}</p>
                    </div>
                  </td>
                  <td data-label="Shortened">{{ local.link.shorturl }}</td>
                  <td data-label="Actions">
                    <v-btn
                      icon
                      color="green"
                      v-clipboard:copy="local.link.shorturl"
                      @click="copy = true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        />
                        <path
                          d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                        />
                      </svg>
                    </v-btn>
                    <v-btn color="blue" @click="generateqrcode(index)" icon>
                      <svg
                        style="width: 24px; height: 24px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z"
                        />
                      </svg>
                    </v-btn>
                    <v-btn color="error" icon @click="removefromlocal(index)">
                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="css-i6dzq1"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path
                          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!--Snackbars-->
    <div>
      <v-snackbar
        color="green"
        elevation="24"
        top
        v-model="copy"
        rounded="pill"
        timeout="1000"
      >
        <h3 class="text-center">Copied</h3>
      </v-snackbar>
    </div>
    <div>
      <v-snackbar
        timeout="3000"
        color="red"
        elevation="24"
        top
        v-model="limit"
        rounded="pill"
      >
        <h3 class="text-center">Quota Exceeded</h3>
      </v-snackbar>
    </div>

    <!--QR code Modal-->
    <v-dialog v-model="qrcode" overlay-color="black" max-width="250">
      <v-sheet align-center color="white">
        <v-card-text class="text-center">
          <qrcode :value="qrcodevalue" :options="{ width: 200 }"></qrcode>
        </v-card-text>
      </v-sheet>
    </v-dialog>
  </div>
</template>


<script>
import api from "../controller/controller";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      headers: [
        {
          text: "Orignal",
          align: "center",
          value: "link.longurl",
          sortable: false,
        },
        {
          text: "Shortened",
          align: "center",
          value: "link.shorturl",
          sortable: false,
        },
        {
          text: "Actions",
          align: "center",
          value: "actions",
          sortable: false,
        },
      ],
      qrcode: false,
      qrcodevalue: "",
      badurl: false,
      badalias: false,
      longurl: "",
      shorturl: null,
      alias: "",
      response: "",
      copy: false,
      limit: false,
      local: [],
      drawer: false,
      loading: false,
      buttonstatus: "Shorten",
      urlplaceholder: "Enter long url...",
      aliasplaceholder: "Alias (Optional)",
    };
  },

  created() {
    this.local = JSON.parse(localStorage.getItem("links")) || [];
  },

  methods: {
    async sub() {
      if (this.longurl != "") {
        this.badalias = false;
        this.badurl = false;
        this.buttonstatus = "Shortening";
        this.loading = true;
        this.response = await api.putURL(this.longurl, this.alias);

        if (this.response.status == "IURL") {
          //invalid url
          this.badurl = true;
          this.longurl = "";
          this.urlplaceholder = "Invalid URL";
        } else if (this.response.status == "AAE") {
          //duplicate alias
          this.badalias = true;
          this.alias = ""; 
          this.aliasplaceholder = "Alias not available";
        } else if (this.response == 429) {
          //Limit reached
          this.limit = true;
        } else {
          //Successful request
          // this.shorturl = this.response.shorturl;
          delete this.response.clicks;
          delete this.response.stats;
          delete this.response.created;
          delete this.response._id;
          delete this.response.alias;
          delete this.response.__v;
          delete this.response.expire_at;
          this.local = this.response;
          this.store(this.local);
        }
      } else {
        this.badurl = true;
        this.longurl = "";
        this.urlplaceholder = "Invalid URL";
      }
      this.buttonstatus = "Shorten";
      this.loading = false;
    },

    store() {
      var temp = [];
      temp = JSON.parse(localStorage.getItem("links")) || [];
      if (this.local != 500) {
        //workaround if server does not respond  //500 internal server error
        temp.splice(0, 0, { link: this.local });
        localStorage.setItem("links", JSON.stringify(temp));
      }
      this.local = JSON.parse(localStorage.getItem("links"));
    },

    removefromlocal(index) {
      this.local.splice(index, 1);
      localStorage.setItem("links", JSON.stringify(this.local));
      this.local = JSON.parse(localStorage.getItem("links"));
    },

    generateqrcode(index) {
      this.qrcode = !this.qrcode;
      var temp = JSON.parse(localStorage.getItem("links"));
      this.qrcodevalue = temp[index].link.shorturl;
    },
  },
};
</script>

<style scoped>
.shortenSpinner {
  margin: 0px 0px -4px 0px;
  display: inline-block;
  border: 4px solid hsl(0, 0%, 83%);
  border-left-color: hsl(0, 0%, 0%);
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: donut-spin 1.2s linear infinite;
}

@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

table {
  border-radius: 0.75rem;
  background-color: #121212;
  padding: 1rem;
  font-weight: bolder;
  font-size: 15px;
  color: #b3b3b3;
  width: 100%;
  border: 2px solid #424242;
}

table thead tr th {
  color: #a0a0a0;
  font-weight: 500;
  text-align: center;
  font-size: 14px;
  min-width: 150px;
  padding: 0.2rem 0.5rem 0.5rem 0.2rem;
}

table tbody tr td {
  height: 40px;
  text-align: center;
  font-size: 14px;
  padding: 0.5rem 0.5rem;
}

tbody div {
  margin: auto;
}

tbody div p {
  max-width: 300px;
  min-width: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  margin: auto;
}

@media screen and (max-width: 800px) {
  table thead {
    display: none;
  }

  table tr {
    margin-bottom: 0.8rem;
    margin-top: -0.4rem;
    display: block;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid rgb(54, 54, 54);
  }

  table tr:last-child {
    border-bottom: none;
    margin-bottom: -0.8rem;
  }
  tbody div {
    width: 20ch;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    float: right;
  }

  table tbody td:before {
    content: attr(data-label);
    float: left;
    font-size: 14px;
    color: #a0a0a0;
    font-weight: 500;
  }

  table tbody tr td {
    display: block;
    text-align: right;
    font-size: 14px;
    border: none;
  }
}
</style>