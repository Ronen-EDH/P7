const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log("authHeader:", authHeader);
    // Do I need this if statement? Or it doesn't do anything here
    // if (authHeader) {
    // Is this still doing authentication?
    const token = authHeader;
    // console.log(token);
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.auth = decodedToken;
    // console.log("decodedToken:", decodedToken);
    // req.auth = { userId: 1, iat: 1678977646, exp: 1679064046 };
    console.log("Authentication successful!");
    next();
    // }
  } catch {
    res.status(401).json({
      error: "Invalid request",
    });
  }
  // next();
};
