"use strict";
const MediaController = require("../../controllers/api/MediaController");
const express = require("express"),
  router = express.Router();
const multer = require("multer");

//http://localhost:3000/api/media/upload
router.post(
  "/upload",
  [MediaController.upload.single("image")],
  MediaController.insert
);

module.exports = router;
