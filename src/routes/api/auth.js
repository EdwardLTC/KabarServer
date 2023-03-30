"use strict";
const AuthController = require("../../controllers/api/AuthController");
const express = require("express"),
  router = express.Router();

//http://localhost:3000/api/auth/login
router.post("/login", AuthController.login);

router.get("/logout", AuthController.checkLogin, AuthController.logout);


module.exports = router;
