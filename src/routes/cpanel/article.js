const express = require("express");
const router = express.Router();
const ArticleController = require("../../controllers/ArticleController");

//http://localhost:3000/cpanel/article/{id}/delete
router.delete("/:id/delete", async (req, res, next) => {
  try {
    const response = await ArticleController.delete(req);
    return res.json({ response });
  } catch (error) {
    return res.json({ response: false });
  }
});

module.exports = router;
