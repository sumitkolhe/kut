const express = require("express");
const routes = require("./routes/reducedRoutes");
const database = require("./middleware/dbConnection");
require("dotenv").config();
const app = express();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes

app.get("/api/status", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(routes);

app.use(express.static(__dirname + "/views/static/"));
app.get("/dashboard", (req, res) =>
  res.sendFile(__dirname + "/views/static/index.html")
);
app.get(/.*/, (req, res) =>
  res.sendFile(__dirname + "/views/errors/error.html")
);

const port = process.env.PORT || 80;

app.listen(port, () => console.log(`Server started on port ${port}`));
