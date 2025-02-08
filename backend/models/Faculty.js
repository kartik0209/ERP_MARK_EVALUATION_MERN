const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const facultySchema = new mongoose.Schema({
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
  subjects: [{ // Changed from subjectIds to subjects
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  }],
  role: {
    type: String,
    enum: ['faculty'],
    default: 'faculty',
  },
}, { timestamps: true });

facultySchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

facultySchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
