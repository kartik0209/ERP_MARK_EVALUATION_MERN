const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject', // Assuming there's a Subject model to reference subjects
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
  absent: {
    type: Boolean,
    default: false,
  },
});

const marksSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  marks: [markSchema], // Array of marks for different subjects
});

const Marks = mongoose.model('Marks', marksSchema);

module.exports = Marks;
