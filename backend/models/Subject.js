const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true, // Course is now required
    },
    sem: {
      type: Number, // Assuming semester is a number
      required: true, // Semester is now required
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
