// middleware/auth.js
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token is not valid" });
  }
}

module.exports = auth;
