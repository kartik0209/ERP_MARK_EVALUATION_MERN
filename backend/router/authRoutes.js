const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/authController"); // Adjust the path as needed

router.post("/verify", verifyToken);

module.exports = router;
