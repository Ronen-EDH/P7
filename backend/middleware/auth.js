const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.auth = decodedToken;
    console.log("Authentication successful!");
    next();
  } catch {
    res.status(401).json({
      error: "Invalid request",
    });
  }
};
