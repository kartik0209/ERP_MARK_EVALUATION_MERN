const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Faculty = require("../models/Faculty");
const Marks = require("../models/Marks");
const Student = require("../models/Student");
const Subject = require("../models/Subject");

// Function to add marks
const addMarks = async (req, res) => {
  const { studentId, subjectId, facultyId, className, marks } = req.body;

  try {
    // Check if student and subject exist
    const student = await Student.findById(studentId);
    const subject = await Subject.findById(subjectId);

    if (!student || !subject) {
      return res.status(404).json({ message: "Student or Subject not found" });
    }

    // Create new marks entry
    const newMarks = new Marks({
      studentId,
      subjectId,
      facultyId,
      className,
      marks,
    });

    // Save new marks entry
    await newMarks.save();

    // Update student's marks array
    student.marks.push({
      subjectId: subject._id,
      mark: marks,
    });

    await student.save();

    res
      .status(201)
      .json({ message: "Marks added successfully", marks: newMarks });
  } catch (error) {
    console.error("Error adding marks:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Function to get all faculties with populated subjects
const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find().populate("subjects", "name code"); // Populating subjects
    res.status(200).json(faculties);
  } catch (error) {
    console.error("Error fetching faculties:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginFaculty = async (req, res) => {
  console.log("Login request received:", req.body);
  try {
    const { email, password } = req.body;

    // Find the faculty by email
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      console.log("Faculty not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: faculty._id, role: faculty.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful, token generated");
    res.status(200).json({ token, user: faculty });
  } catch (err) {
    console.error("Error in loginFaculty:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to logout faculty
const logoutFaculty = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

const getSubDetails = async (req, res) => {
  try {
    const allSubject = await Subject.find();
    res.status(200).json(allSubject);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllStudentDetails = async (req, res) => {
  try {
    const allStudent = await Student.find();
    res.status(200).json(allStudent);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateStudentmarks = async (req, res) => {
  const { students } = req.body;

  try {
    for (const student of students) {
      const { enrollmentNumber, marks, absent, subjectId, subjectName } =
        student;

      const studentDoc = await Student.findOne({ enrollmentNumber });

      if (!studentDoc) {
        return res.status(404).send({
          message: `Student with enrollment number ${enrollmentNumber} not found.`,
        });
      }

      // Create a new mark entry
      const newMarkEntry = {
        subjectId,
        subjectName,
        mark: marks,
        absent: absent === "Y",
        timestamp: new Date(), // Unique timestamp for each entry
      };

      // Push the new mark entry to the marks array
      studentDoc.marks.push(newMarkEntry);

      await studentDoc.save();
    }

    res
      .status(200)
      .send({ message: "Marks and attendance updated successfully!" });
  } catch (error) {
    console.error("Error updating marks:", error);
    res.status(500).send({ message: "Failed to update data." });
  }
};

module.exports = {
  addMarks,
  getAllFaculties, // Exporting getAllFaculties function
  loginFaculty,
  logoutFaculty,
  getSubDetails,
  getAllStudentDetails,
  updateStudentmarks,
};
