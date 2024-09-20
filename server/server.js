const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("../routes");

const server = express();

server.name = "API";

server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, auth-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// catch 404 and forward to error handler
server.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// error handler
server.use((err, req, res) => {
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).send({ message, status, error: err.errors });
});

module.exports = server;