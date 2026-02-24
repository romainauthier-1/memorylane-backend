const bcrypt = require("bcrypt");
const uid2 = require("uid2");
const User = require("../models/users");
var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!checkBody(req.body, ["username", "password"])) {
      res.json({ result: false, message: "Il manque une information" });
      return;
    }

    const checkUser = await User.find({ username });
    if (checkUser.length > 0) {
      res.json({
        result: false,
        message: "Tu es déjà inscrit.e !",
      });
      return;
    }
    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      password: hash,
      token: uid2(32),
    });

    const savedUser = await newUser.save();
    res.json({ result: true, token: savedUser.token });
  } catch (error) {
    res.json({ result: false, error });
  }
});

// SIGNIN
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1 - Vérification des champs
    if (!checkBody(req.body, ["username", "password"])) {
      res.json({ result: false, message: "Il manque une information" });
      return;
    }

    // 2 - Vérification si l'utilisateur.ice existe en BDD
    const checkUser = await User.findOne({ username });
    if (!checkUser) {
      res.json({
        result: false,
        message: "Tu n'es pas inscrit.e !",
      });
      return;
    }

    // 3 - Vérification du mdp haché
    const response = await User.findOne({ username });
    // console.log(response);
    if (response && (await bcrypt.compare(password, response.password))) {
      res.json({
        result: true,
        message: `Bienvenue ${username} !`,
        token: response.token,
      });
    } else {
      res.json({ result: false, error: "Identifiants incorrects" });
    }
  } catch (error) {
    res.json({ result: false, error });
  }
});

module.exports = router;
