const express = require("express");
require("dotenv").config();
require("./database");
const routes = require("./routes");

const app = express();

app.use(process.env.ROUTES_PREFIX, function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization");
  next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(process.env.ROUTES_PREFIX, routes);

const server = app.listen(process.env.SERVER_PORT, function () {
  console.log(process.env.SERVER_MSG, server.address().port);
});
