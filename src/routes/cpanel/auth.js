const express = require("express");
const AuthController = require("../../controllers/cpanel/AuthController");
const router = express.Router();
const { checkTokens } = require("../../middlewares/Authentication");

//http://localhost:3000/cpanel/auth/login
router.get("/login", [checkTokens], AuthController.loginScreen);

//http://localhost:3000/cpanel/auth/login
router.post("/login", AuthController.login);

router.get("/logout", [checkTokens], AuthController.logout);

module.exports = router;
