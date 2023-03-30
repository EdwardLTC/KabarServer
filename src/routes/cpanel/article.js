const express = require("express");
const router = express.Router();
const ArticleController = require("../../controllers/cpanel/ArticleController");
const UploadImage = require("../../middlewares/UploadFile");
const { checkTokens } = require("../../middlewares/Authentication");

//http://localhost:3000/cpanel/articles

router.get("/",[checkTokens], ArticleController.getAll);

router.delete("/:id/delete", ArticleController.delete);

router.get("/add-article", ArticleController.addArticleScreen);

router.post(
  "/add-article",
  [checkTokens, UploadImage.single("image")],
  ArticleController.insert
);

router.get("/:id/detail", [checkTokens], ArticleController.getById);

router.post(
  "/:id/update",
  [checkTokens, UploadImage.single("image")],
  ArticleController.update
);

// router.get("/search", ArticleController.getByTitle);

// router.get("/my-articles", ArticleController.getByAuthor);

module.exports = router;
