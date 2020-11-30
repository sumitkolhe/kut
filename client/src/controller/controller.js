import axios from "axios";

const host = "api/";

class controller {
  //check server status
  static async getstatus() {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
    };

    return axios
      .get(host + "status", axiosConfig)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response.status;
      });
  }

  //get details of a reduced link
  static async getURL(link) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    return axios
      .post(
        host + "check/",
        {
          linktocheck: link,
        },
        axiosConfig
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  //reduce a long url
  static async putURL(longurl, alias) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    if (alias == "") {
      return axios
        .post(
          host + "shorten/",
          {
            longurl: longurl,
          },
          axiosConfig
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.status;
        });
    } else {
      return axios
        .post(
          host + "shorten/",
          {
            alias: alias,
            longurl: longurl,
          },
          axiosConfig
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.status;
        });
    }
  }
}

export default controller;
