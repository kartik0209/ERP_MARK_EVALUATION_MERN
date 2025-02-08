const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Admin = require('../models/Admin');

const authMiddleware = (req, res, next) => {
  console.log('Token verification request:', req.headers.authorization);
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Token verified, user:', decoded);
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check for role-based access
const verifyRole = (roles) => {
  return async (req, res, next) => {
    console.log('Role check for user:', req.user);
    const { id: userId, role } = req.user;

    // Verify if role is correct and user exists in database
    let user;
    if (role === 'student') {
      user = await Student.findById(userId);
    } else if (role === 'faculty') {
      user = await Faculty.findById(userId);
    } else if (role === 'admin') {
      user = await Admin.findById(userId);
    }

    // Check if user exists and has required role
    if (!user) {
      console.log('User not found');
      return res.status(403).json({ message: 'User not found' });
    }

    if (!roles.includes(role)) {
      console.log('Access denied: insufficient role');
      return res.status(403).json({ message: 'Access denied' });
    }

    // Attach user to request object for use in subsequent middleware/routes
    req.user = user;
    next();
  };
};

module.exports = { authMiddleware, verifyRole };
