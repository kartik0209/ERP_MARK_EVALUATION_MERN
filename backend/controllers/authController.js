const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(200).json({ message: "Token is valid", user: decoded });
  });
};
