const jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports.isUser = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decode = jwt.verify(token, config.jwt.secretKey);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
