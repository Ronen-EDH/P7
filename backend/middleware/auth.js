const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    /*     const authHeader = req.headers.authorization;
    console.log("authHeader:", authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    // console.log(token);
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.auth = decodedToken; */
    req.auth = { userId: 1, iat: 1678977646, exp: 1679064046 };
    // console.log("decodedToken:", decodedToken);
    next();
  } catch {
    res.status(401).json({
      error: "Invalid request",
    });
  }
  // next();
};
