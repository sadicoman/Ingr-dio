const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

router.post("/upload", imageController.uploadAndConvertImage);
// router.post("/upload", imageController.handleImageUpload3);

module.exports = router;
