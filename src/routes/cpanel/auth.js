const express = require("express");
const AuthController = require("../../controllers/cpanel/AuthController");
const router = express.Router();

//http://localhost:3000/cpanel/auth/login
router.get("/login", AuthController.loginScreen);

//http://localhost:3000/cpanel/auth/login-request
router.post("/login-request", AuthController.login);

module.exports = router;
