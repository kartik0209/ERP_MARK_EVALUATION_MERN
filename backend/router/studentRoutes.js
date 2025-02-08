const express = require("express");
const router = express.Router();
const { authMiddleware, verifyRole } = require("../middleware/authMiddleware");
const {
  loginStudent,
  logoutStudent,
  getStudentDetails,
  updateStudentProfile,
  forgotPassword,
  resetPassword,
  updateStudentMarksAndAttendance, // New route handler for marks and attendance
} = require("../controllers/studentController");

// Route for student login (Public)
// POST /api/students/login
router.post("/login", loginStudent);

// Route for student logout (Protected)
// POST /api/students/logout
router.post("/logout", authMiddleware, logoutStudent);

// Route for getting student details (Protected and role check for 'student')
// GET /api/students/details
router.get(
  "/details",
  authMiddleware,
  verifyRole(["student"]),
  getStudentDetails
);

// Route for updating student profile (Protected and role check for 'student')
// PUT /api/students/update
router.put(
  "/update",
  authMiddleware,
  verifyRole(["student"]),
  updateStudentProfile
);

// Route for forgot password (Public)
// POST /api/students/forgot-password
router.post("/forgot-password", forgotPassword);

// Route for reset password (Public)
// POST /api/students/reset-password/:token
router.post("/reset-password/:token", resetPassword);

// Route for updating student marks and attendance (Protected and role check for 'faculty')
// POST /api/students/update-marks
router.post(
  "/update-marks",
  authMiddleware,
  verifyRole(["faculty"]),
  updateStudentMarksAndAttendance
);

module.exports = router;
