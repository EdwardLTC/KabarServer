const express = require("express");
const router = express.Router();
const ArticleController = require("../../controllers/cpanel/ArticleController");
const UploadImage = require("../../middlewares/UploadFile");
const { checkTokens } = require("../../middlewares/Authentication");
const MediaController = require("../../controllers/api/MediaController");
const AuthController = require("../../controllers/api/AuthController");
//http://localhost:3000/cpanel/articles

router.get("/", checkTokens, ArticleController.getAll);

router.delete("/:id/delete", ArticleController.delete);

router.get("/add-article", ArticleController.addArticleScreen);

router.post(
  "/add-article",
  [
    checkTokens,
    AuthController.checkLogin,
    MediaController.upload.single("image"),
  ],
  ArticleController.insert
);

router.get(
  "/:id/detail",
  [checkTokens, AuthController.checkLogin],
  ArticleController.getById
);

router.post(
  "/:id/update",
  [
    checkTokens,
    AuthController.checkLogin,
    MediaController.upload.single("image"),
  ],
  ArticleController.update
);

module.exports = router;
