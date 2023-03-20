const express = require("express");
const router = express.Router();

//http://localhost:3000/cpanel/auth/login
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/", (req, res) => {
  res.render("index");
});

//http://localhost:3000/cpanel/auth/login-request
router.post("/login-request", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      res.redirect("/cpanel/auth");
    } else {
      res.redirect("login");
    }
  } catch (error) {
    res.redirect("login");
  }
});

module.exports = router;