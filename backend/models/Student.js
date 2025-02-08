const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema(
  {
    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    sem: {
      type: Number, // Assuming semester is a number
      required: true,
    },
    division: {
      type: String, // Assuming division is a string (e.g., 'A', 'B', etc.)
      required: true,
    },
    marks: [
      {
        subjectName: {
          type: String,
        },
        mark: {
          type: Number,
        },
        absent: {
          type: String,
          default: false,
        },
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    role: {
      type: String,
      enum: ["student"],
      default: "student",
    },
  },
  { timestamps: true }
);

// Hash the password before saving the student document
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

studentSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate JWT token
studentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
