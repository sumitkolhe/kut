const express = require("express");
const routes = require("./route/route");
const database = require("./middleware/db");
const env = require("./config/config")
const app = express();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes

app.get("/api/status", (req, res) => {
  console.log("Server online")
  res.status(200).json({ status: "OK" });
});

app.use(routes);

app.use(express.static(__dirname + "/view/static/"));
app.get("/dashboard", (req, res) =>
  res.sendFile(__dirname + "/view/static/index.html")
);
app.get(/.*/, (req, res) =>
  res.sendFile(__dirname + "/view/error/error.html")
);

const port = process.env.PORT || 80;

app.listen(port, () => console.log(`Server started on port ${port}`));
