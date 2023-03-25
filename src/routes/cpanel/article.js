const express = require("express");
const router = express.Router();
const ArticleController = require("../../controllers/cpanel/ArticleController");
const MediaController = require("../../controllers/api/MediaController");
const UploadImage = require("../../middlewares/UploadFile");

//http://localhost:3000/cpanel/articles/{id}/delete
router.delete("/:id/delete", ArticleController.delete);

//http://localhost:3000/cpanel/articles/add-article
router.get("/add-article", async (req, res, next) => {
  res.render("add-article");
});

router.post(
  "/add-article",
  [UploadImage.single("image")],
  ArticleController.insert
);

module.exports = router;
