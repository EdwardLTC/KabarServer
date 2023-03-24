const express = require("express");
const router = express.Router();
const ArticleController = require("../../controllers/ArticleController");

//http://localhost:3000/cpanel/homes
router.get("/", async (req, res, next) => {
  const Articles = await ArticleController.getAll();
  res.render("index", { list: Articles.data });
});

module.exports = router;
