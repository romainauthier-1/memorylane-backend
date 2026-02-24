const express = require("express");
const router = express.Router();
const multer = require("../config/multer");

// POST créer url du fichier envoyé
router.post("/", multer.single("file"), (req, res, next) => {
  console.log(req.file);
  res.json({
    result: true,
    url: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;
