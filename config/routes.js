"use strict";
const apiRoutes = require("../system/routers/api");
const cpanelRpoutes = require("../system/routers/cpanel");

module.exports.setRoutes = (app) => {
  /**
   * Application Root Route.
   * Set the Welcome message or send a static html or use a view engine.
   */

  /**
   * API Route.
   * All the API will start with "/api/[MODULE_ROUTE]"
   * 
   * Cpanel Route.
   * All the Cpanel will start with "/cpanel/[MODULE_ROUTE]"
   */
  app.use("/api", apiRoutes);
  app.use("/cpanel", cpanelRpoutes);
};
