const Memory = require("../models/memories");
const User = require("../models/users");
var express = require("express");
var router = express.Router();

// GET All - récupérer toutes les memories
router.get("/all", async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.json({ result: false, message: "Petit problème..." });
      return;
    }
    const token = req.headers.authorization.replace("Bearer ", "").trim();
    const user = await User.findOne({ token });
    if (!token) {
      res.json({ result: false, message: "Petit problème..." });
      return;
    }

    if (user.isAdmin) {
      const allMemories = await Memory.find();
      res.json({
        result: true,
        numberOfMemories: allMemories.length,
        memories: allMemories,
      });
    } else {
      const allMemories = await Memory.find({ user: user._id });
      res.json({
        result: true,
        numberOfMemories: allMemories.length,
        memories: allMemories,
      });
    }
  } catch (error) {
    res.json({ result: false, error });
  }
});

// GET One - récupérer une memory
router.get("/:id", async (req, res) => {
  try {
    const foundMemory = await Memory.findById(req.params.id);
    res.json({ result: true, memory: foundMemory });
  } catch (error) {
    res.json({ result: false, error });
  }
});

// POST One - ajouter une memory
router.post("/", async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.json({ result: false, message: "Petit problème..." });
      return;
    }

    const token = req.headers.authorization.replace("Bearer ", "").trim();
    // console.log("TOKEN REÇU: ", token);
    const user = await User.findOne({ token });
    if (!token) {
      res.json({ result: false, message: "Petit problème..." });
      return;
    }
    if (user) {
      const newMemory = await new Memory({ ...req.body, user: user._id });
      newMemory.thumbnail = newMemory.medias[0].url;
      const savedMemory = await newMemory.save();
      res.json({ result: true, savedMemory });
    } else {
      res.json({ result: false, message: "Inconnu au bataillon !" });
    }
  } catch (error) {
    console.error(error.message);
    res.json({ result: false, error: error.message });
  }
});

// PUT One - éditer une memory
router.put("/:id", async (req, res) => {
  try {
    const updatedMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json({
      result: true,
      memory: updatedMemory,
      message: "Souvenir mis à jour avec succès !",
    });
  } catch (error) {
    res.json({ result: false, error });
  }
});

// PUT Title - éditer une memory
router.put("/title/:id", async (req, res) => {
  const { id } = req.params;
  const { newTitle } = req.body;

  try {
    const memory = await Memory.findById(id);

    memory.title = newTitle;

    const updatedMemory = await memory.save();

    res.json({
      result: true,
      memory: updatedMemory,
      message: "Titre mis à jour avec succès !",
    });
  } catch (error) {
    res.json({ result: false, error });
  }
});

// PUT Description - éditer une memory
router.put("/description/:id", async (req, res) => {
  const { id } = req.params;
  const { newDescription } = req.body;

  try {
    const memory = await Memory.findById(id);

    memory.description = newDescription;

    const updatedMemory = await memory.save();

    res.json({
      result: true,
      memory: updatedMemory,
      message: "Description mise à jour avec succès !",
    });
  } catch (error) {
    res.json({ result: false, error });
  }
});

// PUT Caption - éditer une memory
router.put("/caption/:id", async (req, res) => {
  const { id } = req.params;
  const { mediaNewCaption, mediaIndex } = req.body;

  try {
    const memory = await Memory.findById(id);

    memory.medias[mediaIndex].caption = mediaNewCaption;

    const updatedMemory = await memory.save();

    res.json({
      result: true,
      memory: updatedMemory,
      message: "Légende mis à jour avec succès !",
    });
  } catch (error) {
    res.json({ result: false, error });
  }
});

// DELETE One - supprimer une memory
router.delete("/:id", async (req, res) => {
  try {
    const foundMemory = await Memory.findById(req.params.id);
    deletedMemory = await foundMemory.deleteOne();
    res.json({
      result: true,
      deletedMemory: foundMemory,
      message: "Souvenir supprimé !",
    });
  } catch (error) {
    res.json({ result: false, error });
  }
});

module.exports = router;
