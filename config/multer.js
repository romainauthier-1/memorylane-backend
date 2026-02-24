const multer = require("multer");

// Définir où sont stockés les fichiers téléchargés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

function fileFilter(req, file, cb) {
  file.mimetype.startsWith("image/") ||
  file.mimetype.startsWith("audio/") ||
  file.mimetype.startsWith("video/")
    ? cb(null, true)
    : // : cb(null, false);
      cb(new Error("Type de fichier non supporté"));
}
module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
});
