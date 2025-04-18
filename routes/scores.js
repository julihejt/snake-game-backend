// routes/scores.js
const express = require("express");
const Score = require("../models/Score");
const auth = require("../middleware/auth");

const router = express.Router();

// Submit a highscore (requires login)
router.post("/", auth, async (req, res) => {
  try {
    const { value } = req.body;

    const newScore = new Score({
      user: req.user.id,
      value,
    });

    await newScore.save();
    res.status(201).json({ message: "Score saved", score: newScore });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all scores for the logged-in user
router.get("/my-scores", auth, async (req, res) => {
  try {
    const scores = await Score.find({ user: req.user.id }).sort({ value: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
