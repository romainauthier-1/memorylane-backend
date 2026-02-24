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
  console.log("--- DEBUG HEADERS ---");
  console.log(req.headers);
  console.log("--- FIN DEBUG ---");
  try {
    if (!req.headers.authorization) {
      res.json({ result: false, message: "Petit problème..." });
      return;
    }

    const token = req.headers.authorization.replace("Bearer ", "").trim();
    console.log("TOKEN REÇU: ", token);
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
    console.error(error);
    res.json({ result: false, error });
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
    res.json({ result: true, memory: updatedMemory });
  } catch (error) {
    res.json({ result: false, error });
  }
});

// DELETE One - supprimer une memory
router.delete("/:id", async (req, res) => {
  try {
    const foundMemory = await Memory.findById(req.params.id);
    deletedMemory = await foundMemory.deleteOne();
    res.json({ result: true, deletedMemory: foundMemory });
  } catch (error) {
    res.json({ result: false, error });
  }
});

module.exports = router;
