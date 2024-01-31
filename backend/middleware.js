const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMidddleware = (req, res, next) => {
  const authHeader = req.headers.authoriztion;

  if (!authHeader || !authHeader.startsWith("bearer ")) {
    return res.status(403).json({
      message: "No headers",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({});
  }
};

module.exports = {
  authMidddleware,
};
