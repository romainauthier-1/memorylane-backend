const Memory = require("../models/memories");
var express = require("express");
var router = express.Router();

// GET All - récupérer toutes les memories
router.get("/all", async (req, res) => {
  try {
    const allMemories = await Memory.find();
    res.json({
      result: true,
      numberOfMemories: allMemories.length,
      memories: allMemories,
    });
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
    const newMemory = await new Memory(req.body);
    newMemory.thumbnail = newMemory.medias[0].url;
    const savedMemory = await newMemory.save();
    res.json({ result: true, savedMemory });
  } catch (error) {
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
