const express = require("express");
const router = express.Router();

// Fake user DB
const users = [];

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  res.status(201).json({ message: "User created", email });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json({ token: "fake-jwt-token" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
