// routes/scores.js
const express = require("express");
const Score = require("../models/Score");
const auth = require("../middleware/auth");

const router = express.Router();

// Submit a highscore (requires login)
router.post("/highscores", auth, async (req, res) => {
  console.log("Auth middleware passed. req.user:", req.user);
  const { score } = req.body;

  if (!req.user?.id || score == null) {
    return res.status(400).json({ message: "Missing user ID or score" });
  }

  try {
    const newScore = new Score({
      user: req.user.id, // comes from the decoded token
      value: score,
    });

    await newScore.save();

    res.status(201).json({ message: "Score submitted successfully" });
  } catch (err) {
    console.error("Error saving score:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all scores for the logged-in user
router.get("/my-scores", auth, async (req, res) => {
  console.log(`fetch my scores`, req.user.id);
  try {
    const scores = await Score.find({ user: req.user.id }).sort({ value: -1 });
    return res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
