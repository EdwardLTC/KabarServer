const express = require("express");
const router = express.Router();
const ArticleController = require("../../controllers/cpanel/ArticleController");

//http://localhost:3000/cpanel/homes
router.get("/", ArticleController.getAll);

module.exports = router;
