"use strict";
const express = require("express");
const router = express.Router();
const pluralize = require("pluralize");
const path = require("path");

pluralize.addUncountableRule("media");
pluralize.addUncountableRule("auth");

const fs = require("fs");
const { HttpError } = require("../helpers/HttpError");
const packageJson = require("../../package.json"),
  routesPath = path.resolve(`${__dirname}/../../src/routes/api`),
  PATHS = fs.readdirSync(routesPath),
  moduleMapper = [];

console.log("✔ Mapping API routes");
PATHS.forEach((module) => {
  if (module !== "index.js") {
    const name = module.split(".")[0];
    router.use(
      `/${pluralize.plural(name)}`,
      require(path.resolve(routesPath, module))
    );
    moduleMapper.push({
      Module: name,
      Route: `/${pluralize.plural(name)}`,
    });
  }
});
console.table(moduleMapper);

router.get("/", (req, res) => {
  // //res.json({ 'status': true, 'message': `Welcome to ${packageJson.name} V ${packageJson.version}` });
  // const arr = Array.from({ length: 5 }, (_, index) => ({
  //   ORDER: index.toString(),
  //   STATUS: "HAHA",
  //   OPERATORS: "Oliver Trag",
  //   LOCATION: "London, UK",
  //   DISTANCE: "485 km",
  //   START_DATE: new Date(),
  //   EST_DELIVERY_DUE: new Date(),
  // }));
  // res.render("index", { list: arr });
});

router.use("*", (req, res, next) => {
  // 404 handler
  const error = new Error("Resource not found");
  error.statusCode = 404;
  next(error);
});

router.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(req.method, req.url, err.statusCode, err.message);
  }
  const error = new HttpError(err);
  res.status(error.statusCode);
  res.json(error);
  next();
});

module.exports = router;