const User = require("../models/users");
const Memory = require("../models/memories");

// Vérifie le token "Bearer <token>" et place l'utilisateur dans req.user
async function requireAuth(req, res, next) {
  try {
    const token = (req.headers.authorization || "")
      .replace("Bearer ", "")
      .trim();
    if (!token) {
      return res
        .status(401)
        .json({ result: false, error: "Authentification requise" });
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ result: false, error: "Token invalide" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ result: false, error: err.message });
  }
}

// Charge le souvenir :paramName dans req.memory, si l'utilisateur en est le propriétaire (ou admin)
function loadOwnedMemory(paramName = "id") {
  return async (req, res, next) => {
    try {
      const memory = await Memory.findById(req.params[paramName]);
      if (!memory) {
        return res
          .status(404)
          .json({ result: false, error: "Souvenir introuvable" });
      }

      const isOwner = String(memory.user) === String(req.user._id);
      if (!isOwner && !req.user.isAdmin) {
        return res.status(403).json({ result: false, error: "Accès refusé" });
      }

      req.memory = memory;
      next();
    } catch (err) {
      // id mal formé (CastError) => même réponse qu'un souvenir inexistant
      if (err.name === "CastError") {
        return res
          .status(404)
          .json({ result: false, error: "Souvenir introuvable" });
      }
      res.status(500).json({ result: false, error: err.message });
    }
  };
}

module.exports = { requireAuth, loadOwnedMemory };
