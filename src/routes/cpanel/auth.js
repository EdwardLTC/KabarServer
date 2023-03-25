const express = require("express");
const AuthController = require("../../controllers/cpanel/AuthController");
const router = express.Router();

//http://localhost:3000/cpanel/auth/login
router.get("/login", (req, res) => {
  res.render("login");
});

//http://localhost:3000/cpanel/auth/login-request
router.post("/login-request", AuthController.login);

module.exports = router;
