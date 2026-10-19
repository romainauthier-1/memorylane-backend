const Memory = require("../models/memories");
const { requireAuth, loadOwnedMemory } = require("../modules/auth");
var express = require("express");
var router = express.Router();

// Toutes les routes des souvenirs nécessitent un utilisateur connecté
router.use(requireAuth);

// GET All - récupérer les memories de l'utilisateur (toutes pour un admin)
router.get("/all", async (req, res) => {
  try {
    const filter = req.user.isAdmin ? {} : { user: req.user._id };
    const allMemories = await Memory.find(filter);
    res.json({
      result: true,
      numberOfMemories: allMemories.length,
      memories: allMemories,
    });
  } catch (error) {
    res.status(500).json({ result: false, error: error.message });
  }
});

// GET One - récupérer une memory
router.get("/:id", loadOwnedMemory(), (req, res) => {
  res.json({ result: true, memory: req.memory });
});

// POST One - ajouter une memory
router.post("/", async (req, res) => {
  try {
    const newMemory = new Memory({ ...req.body, user: req.user._id });
    newMemory.thumbnail = newMemory.medias[0]?.url || "";
    const savedMemory = await newMemory.save();
    res.json({ result: true, savedMemory });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ result: false, error: error.message });
  }
});

// PUT One - éditer une memory
router.put("/:id", loadOwnedMemory(), async (req, res) => {
  try {
    // le propriétaire d'un souvenir ne peut pas être modifié
    const { user, ...updates } = req.body;
    req.memory.set(updates);
    const updatedMemory = await req.memory.save();
    res.json({
      result: true,
      memory: updatedMemory,
      message: "Souvenir mis à jour avec succès !",
    });
  } catch (error) {
    res.status(400).json({ result: false, error: error.message });
  }
});

// PUT Title - éditer le titre d'une memory
router.put("/title/:id", loadOwnedMemory(), async (req, res) => {
  try {
    req.memory.title = req.body.newTitle;
    const updatedMemory = await req.memory.save();
    res.json({
      result: true,
      memory: updatedMemory,
      message: "Titre mis à jour avec succès !",
    });
  } catch (error) {
    res.status(400).json({ result: false, error: error.message });
  }
});

// PUT Description - éditer la description d'une memory
router.put("/description/:id", loadOwnedMemory(), async (req, res) => {
  try {
    req.memory.description = req.body.newDescription;
    const updatedMemory = await req.memory.save();
    res.json({
      result: true,
      memory: updatedMemory,
      message: "Description mise à jour avec succès !",
    });
  } catch (error) {
    res.status(400).json({ result: false, error: error.message });
  }
});

// PUT Caption - éditer la légende d'un média
router.put("/caption/:id", loadOwnedMemory(), async (req, res) => {
  const { mediaNewCaption, mediaIndex } = req.body;
  try {
    const media = req.memory.medias[mediaIndex];
    if (!media) {
      return res
        .status(404)
        .json({ result: false, error: "Média introuvable" });
    }
    media.caption = mediaNewCaption;
    const updatedMemory = await req.memory.save();
    res.json({
      result: true,
      memory: updatedMemory,
      message: "Légende mise à jour avec succès !",
    });
  } catch (error) {
    res.status(400).json({ result: false, error: error.message });
  }
});

// DELETE One - supprimer une memory
router.delete("/:id", loadOwnedMemory(), async (req, res) => {
  try {
    await req.memory.deleteOne();
    res.json({
      result: true,
      deletedMemory: req.memory,
      message: "Souvenir supprimé !",
    });
  } catch (error) {
    res.status(500).json({ result: false, error: error.message });
  }
});

// POST Ajouter des médias à un souvenir
router.post("/:id/add-media", loadOwnedMemory(), async (req, res) => {
  try {
    const newMedias = Array.isArray(req.body) ? req.body : [req.body];
    req.memory.medias.push(...newMedias);
    await req.memory.save();
    res.json({ result: true, message: "Média ajouté !" });
  } catch (err) {
    res.status(400).json({ result: false, error: err.message });
  }
});

// DELETE Supprimer un média d'un souvenir
router.delete(
  "/:memoryId/media/:mediaId",
  loadOwnedMemory("memoryId"),
  async (req, res) => {
    try {
      req.memory.medias = req.memory.medias.filter(
        (media) => String(media._id) !== req.params.mediaId,
      );
      await req.memory.save();
      res.json({ result: true, message: "Média supprimé !" });
    } catch (err) {
      res.status(400).json({ result: false, error: err.message });
    }
  },
);

module.exports = router;
