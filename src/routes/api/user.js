"use strict";
const UserController = require("../../controllers/api/UserController");
const express = require("express"),
  router = express.Router();
const AuthController = require("../../controllers/api/AuthController");

// http://localhost:3000/api/users/register
router.post("/register", UserController.register);

//http://localhost:3000/api/users/send-mail
router.post("/send-mail", UserController.sendMail);

router.get("/confirm-account/:email", UserController.confirmAccount);

router.post(
  "/change-password",
  AuthController.checkLogin,
  UserController.changePassword
);

router.post(
  "/update-profile",
  AuthController.checkLogin,
  UserController.updateProfile
);

module.exports = router;
