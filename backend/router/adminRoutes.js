const express = require("express");
const router = express.Router();

const { authMiddleware, verifyRole } = require("../middleware/authMiddleware");
const {
  loginAdmin,
  addFaculty,
  updateFaculty,
  deleteFaculty,
  getAllFaculties,
  addSubject,
  getAllSubjects,
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  registerAdmin,
} = require("../controllers/adminController");

// Route for admin login (Public)
router.post("/login", loginAdmin);

router.post("/register", registerAdmin);

// Admin routes for managing faculty (Protected and role check for 'admin')
router.post("/faculty", authMiddleware, verifyRole(["admin"]), addFaculty);
router.put(
  "/faculty/:id",
  authMiddleware,
  verifyRole(["admin"]),
  updateFaculty
);
router.delete(
  "/faculty/:id",
  authMiddleware,
  verifyRole(["admin"]),
  deleteFaculty
);
router.get(
  "/faculties",
  authMiddleware,
  verifyRole(["admin"]),
  getAllFaculties
);

// Admin routes for managing subjects (Protected and role check for 'admin')
router.post("/subject", authMiddleware, verifyRole(["admin"]), addSubject);
router.get("/subjects", authMiddleware, verifyRole(["admin"]), getAllSubjects);

// Admin routes for managing students (Protected and role check for 'admin')
router.post("/student", authMiddleware, verifyRole(["admin"]), addStudent);
router.put(
  "/student/:id",
  authMiddleware,
  verifyRole(["admin"]),
  updateStudent
);
router.delete(
  "/student/:id",
  authMiddleware,
  verifyRole(["admin"]),
  deleteStudent
);
router.get("/students", authMiddleware, verifyRole(["admin"]), getAllStudents);

module.exports = router;
