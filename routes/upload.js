const express = require("express");
const router = express.Router();
const path = require("path");
const uniqid = require("uniqid");
const cloudinary = require("cloudinary").v2;
const fileSystem = require("fs");
const os = require("os");

// POST créer url du fichier envoyé
router.post("/", async (req, res) => {
  // console.log("POST /upload, fichier envoyé: ", req.files?.file);
  // const extension = path.extname(req.files?.file.name);
  // const photoPath = path.join(os.tmpdir(), `${uniqid()}${extension}`);
  // console.log("Chemin utilisé: ", sourcePath);
  // const resultMove = await req.files.file.mv(sourcePath);
  const sourcePath = req.files.file.tempFilePath;

  try {
    if (!req.files || !req.files.file) {
      return res.json({ result: false, error: "Aucun fichier reçu" });
    }

    const resultCloudinary = await cloudinary.uploader.upload_large(
      sourcePath,
      {
        resource_type: "auto",
        chunk_size: 6000000,
      },
    );

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
