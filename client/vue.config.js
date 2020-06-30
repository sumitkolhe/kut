const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../server/views/static"),
  publicPath: "",
  devServer:{
    proxy:{
      "/api":{
        target:"http://localhost:80"
      }
    }
  },

  transpileDependencies: ["vuetify"],
};
