"use strict";
const apiRoutes = require("../system/routers/api");
const cpanelRpoutes = require("../system/routers/cpanel");

module.exports.setRoutes = (app) => {
  /**
   * Application Root Route.
   * Set the Welcome message or send a static html or use a view engine.
   */

  /**
   * app.get("/", (req, res) => {
   *  res.send("Welcome to the APP");
   *});*/

  /**
   * API Route.
   * All the API will start with "/api/[MODULE_ROUTE]"
   */
  app.use("/api", apiRoutes);
  app.use("/cpanel", cpanelRpoutes);
};
