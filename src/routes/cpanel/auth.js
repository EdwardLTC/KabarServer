const express = require("express");
const AuthController = require("../../controllers/AuthController");
const router = express.Router();

//http://localhost:3000/cpanel/auth/login
router.get("/login", (req, res) => {
  res.render("login");
});

//http://localhost:3000/cpanel/auth/login-request
router.post("/login-request", async (req, res, next) => {
  try {
    const result = await AuthController.login(req);
    if (result) {
      res.redirect("/cpanel/homes");
    } else {
      res.redirect("login");
    }
  } catch (error) {
    res.redirect("login");
  }
});

module.exports = router;
