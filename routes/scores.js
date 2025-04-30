// routes/scores.js
const express = require("express");
const Score = require("../models/Score");
const auth = require("../middleware/auth");

const router = express.Router();

// Submit a highscore (requires login)
router.post("/highscores", async (req, res) => {
  const { username, score } = req.body;

  if (!username || score == null) {
    return res.status(400).json({ message: "Missing username or score" });
  }

  // Save the score here (placeholder logic)
  console.log(`Received score from ${username}: ${score}`);

  return res.status(201).json({ message: "Score submitted successfully" });
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
