const express = require("express");
const router = express.Router();
const path = require("path");
const uniqid = require("uniqid");
const cloudinary = require("cloudinary").v2;
const fileSystem = require("fs");

// POST créer url du fichier envoyé
router.post("/", async (req, res) => {
  // console.log("POST /upload, fichier envoyé: ", req.files?.file);
  const extension = path.extname(req.files?.file.name);
  const photoPath = path.join(
    __dirname,
    "..",
    "tmp",
    `${uniqid()}${extension}`,
  );
  // console.log("Chemin utilisé: ", photoPath);
  const resultMove = await req.files.file.mv(photoPath);

  if (!resultMove) {
    const resultCloudinary = await cloudinary.uploader.upload(photoPath);

    fileSystem.unlinkSync(photoPath);
    res.json({
      result: true,
      url: resultCloudinary.secure_url,
      type: resultCloudinary.resource_type,
    });
  } else {
    res.json({ result: false, error: resultMove });
  }
});

module.exports = router;
