const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Faculty = require("../models/Faculty");
const Subject = require("../models/Subject");
const Student = require("../models/Student");
const Admin = require("../models/Admin");

// const addFaculty = async (req, res) => {
//   const { name, email, password, department, subjectIds } = req.body;

//   try {
//     // Check if faculty already exists
//     let faculty = await Faculty.findOne({ email });
//     if (faculty) {
//       return res.status(400).json({ message: 'Faculty already exists' });
//     }

//     // Validate subjectIds
//     for (const subjectId of subjectIds) {
//       if (!mongoose.Types.ObjectId.isValid(subjectId)) {
//         return res.status(400).json({ message: 'Invalid subject ID' });
//       }
//     }

//     // Check if all subjects exist
//     const subjects = await Subject.find({ _id: { $in: subjectIds } });
//     if (subjects.length !== subjectIds.length) {
//       return res.status(404).json({ message: 'One or more subjects not found' });
//     }

//     // Create new faculty
//     faculty = new Faculty({ name, email, password, department, subjectIds });

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     faculty.password = await bcrypt.hash(password, salt);

//     await faculty.save();
//     res.status(201).json({ message: 'Faculty added successfully', faculty });
//   } catch (error) {
//     console.error('Error adding faculty:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

const addFaculty = async (req, res) => {
  const { name, email, password, department, subjects } = req.body;

  try {
    // Check if faculty already exists
    let faculty = await Faculty.findOne({ email });
    if (faculty) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    // Validate subjects
    const subjectIds = [];
    for (const subject of subjects) {
      const existingSubject = await Subject.findOne({
        name: subject.name,
        code: subject.code,
      });
      if (!existingSubject) {
        return res.status(404).json({
          message: `Subject not found: ${subject.name} ${subject.code}`,
        });
      }
      subjectIds.push(existingSubject._id);
    }

    // Create new faculty
    faculty = new Faculty({ name, email, password, department, subjectIds });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    faculty.password = await bcrypt.hash(password, salt);

    await faculty.save();
    res.status(201).json({ message: "Faculty added successfully", faculty });
  } catch (error) {
    console.error("Error adding faculty:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// const updateFaculty = async (req, res) => {
//   const { id } = req.params;
//   const { name, email, department, subjectIds } = req.body;

//   try {
//     const faculty = await Faculty.findById(id);
//     if (!faculty) {
//       return res.status(404).json({ message: 'Faculty not found' });
//     }

//     // Validate subjectIds
//     if (subjectIds) {
//       for (const subjectId of subjectIds) {
//         if (!mongoose.Types.ObjectId.isValid(subjectId)) {
//           return res.status(400).json({ message: 'Invalid subject ID' });
//         }
//       }

//       // Check if all subjects exist
//       const subjects = await Subject.find({ _id: { $in: subjectIds } });
//       if (subjects.length !== subjectIds.length) {
//         return res.status(404).json({ message: 'One or more subjects not found' });
//       }

//       faculty.subjectIds = subjectIds;
//     }

//     faculty.name = name || faculty.name;
//     faculty.email = email || faculty.email;
//     faculty.department = department || faculty.department;

//     await faculty.save();
//     res.status(200).json({ message: 'Faculty updated successfully', faculty });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
const updateFaculty = async (req, res) => {
  const { id } = req.params;
  const { name, email, department, subjects } = req.body;

  try {
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Validate and update subjects
    const subjectIds = [];
    if (subjects) {
      for (const subject of subjects) {
        const existingSubject = await Subject.findOne({
          name: subject.name,
          code: subject.code,
        });
        if (!existingSubject) {
          return res.status(404).json({
            message: `Subject not found: ${subject.name} ${subject.code}`,
          });
        }
        subjectIds.push(existingSubject._id);
      }

      faculty.subjectIds = subjectIds;
    }

    faculty.name = name || faculty.name;
    faculty.email = email || faculty.email;
    faculty.department = department || faculty.department;

    await faculty.save();
    res.status(200).json({ message: "Faculty updated successfully", faculty });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to delete a faculty
const deleteFaculty = async (req, res) => {
  const { id } = req.params;

  console.log(`Attempting to delete faculty with ID: ${id}`); // Debug log

  try {
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      console.log("Faculty not found"); // Debug log
      return res.status(404).json({ message: "Faculty not found" });
    }

    await Faculty.deleteOne({ _id: id });
    console.log("Faculty deleted successfully"); // Debug log
    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    console.error("Server error:", error); // Debug log
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to get all faculties
const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to add a subject
const addSubject = async (req, res) => {
  const { name, code, course, sem } = req.body;

  try {
    if (!name || !code || !course || !sem) {
      return res
        .status(400)
        .json({ message: "Name, code, course, and semester are required" });
    }

    // Create new subject
    const subject = new Subject({
      name,
      code,
      course,
      sem,
    });

    await subject.save();
    res.status(201).json({ message: "Subject added successfully", subject });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to get all subjects
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to add a student
const addStudent = async (req, res) => {
  const { enrollmentNumber, name, email, password, department, sem, division } =
    req.body;

  try {
    // Check if student already exists
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Create new student
    student = new Student({
      enrollmentNumber,
      name,
      email,
      password,
      department,
      sem,
      division, // Added sem and division
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(password, salt);

    await student.save();
    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to update a student
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { enrollmentNumber, name, email, department } = req.body;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.enrollmentNumber = enrollmentNumber || student.enrollmentNumber;
    student.name = name || student.name;
    student.email = email || student.email;
    student.department = department || student.department;

    await student.save();
    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to delete a student
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.deleteOne({ _id: id });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const registerAdmin = async (req, res) => {
  console.log("Registration request received:", req.body); // Log incoming request
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    // Save the admin to the database
    await newAdmin.save();

    console.log("Admin registered successfully");
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("Error in registerAdmin:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to login admin
const loginAdmin = async (req, res) => {
  console.log("Login request received:", req.body); // Log incoming request
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful, token generated");
    res.status(200).json({ token, user: admin });
  } catch (err) {
    console.error("Error in loginAdmin:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
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
  loginAdmin,
  registerAdmin,
};
