// models/Score.js
const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Score", ScoreSchema);
