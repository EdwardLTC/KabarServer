const express = require("express");
const router = express.Router();
const ArticleController = require("../../controllers/cpanel/ArticleController");
const UploadImage = require("../../middlewares/UploadFile");

//http://localhost:3000/cpanel/articles

router.get("/", ArticleController.getAll);

router.delete("/:id/delete", ArticleController.delete);

router.get("/add-article", ArticleController.addArticleScreen);

router.post("/add-article",[UploadImage.single("image")],ArticleController.insert);

router.get("/:id/detail", ArticleController.getById);

router.post("/:id/update",[UploadImage.single("image")], ArticleController.update);


// router.get("/search", ArticleController.getByTitle);

// router.get("/my-articles", ArticleController.getByAuthor);


module.exports = router;
