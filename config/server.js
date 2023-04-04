const express = require("express");
const logger = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const utility = require("../system/helpers/Utility");
// const helmet = require("helmet");
const server = express();
const { setRoutes } = require("./routes");
const session = require("express-session");

server.use(
  session({
    secret: "iloveyou",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.set("views", path.join(__dirname, "../views"));
server.set("view engine", "hbs");
server.use(cookieParser());
server.use(express.static(path.join(__dirname, "../public")));

hbs.registerHelper("formatDate", utility.formatDate);
hbs.registerHelper("formatTime", utility.formatTime);
hbs.registerHelper("index", utility.index);
hbs.registerHelper("getEventStatus", utility.getEventStatus);
hbs.registerHelper("getRole", utility.getRole);
hbs.registerHelper("checkPermission", utility.checkPermission);

const cors = require("cors"),
  // Allow Origins according to your need.
  corsOptions = {
    origin: "*",
  };

server.use(cors(corsOptions));

// Setting up Routes
setRoutes(server);

process.on("uncaughtException", function (exception) {
  // handle or ignore error
  console.log(exception);
});

module.exports = { server };
