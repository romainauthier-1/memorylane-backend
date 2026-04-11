const express = require("express");
const router = express.Router();
const path = require("path");
const uniqid = require("uniqid");
const cloudinary = require("cloudinary").v2;
const fileSystem = require("fs");
const os = require("os");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST créer url du fichier envoyé
router.post("/", async (req, res) => {
  const sourcePath = req.files.file.tempFilePath;

  try {
    if (!req.files || !req.files.file) {
      return res.json({ result: false, error: "Aucun fichier reçu" });
    }

    if (!sourcePath || !fileSystem.existsSync(sourcePath)) {
      return res.json({
        result: false,
        error: "Fichier temporaire introuvable",
      });
    }

    const resultCloudinary = await cloudinary.uploader.upload(sourcePath, {
      resource_type: "auto",
      chunk_size: 6000000,
    });

    if (fileSystem.existsSync(sourcePath)) {
      fileSystem.unlinkSync(sourcePath);
    }

    res.json({
      result: true,
      url: resultCloudinary.secure_url,
      type: resultCloudinary.resource_type,
    });
  } catch (err) {
    console.error("Erreur Cloudinary:", err);
    res.json({ result: false, error: err.message });
  }
});

module.exports = router;
