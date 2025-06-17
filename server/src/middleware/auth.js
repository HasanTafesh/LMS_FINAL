const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.auth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

// Check if user is instructor
exports.instructorAuth = async (req, res, next) => {
  if (req.user.role !== 'instructor') {
    return res.status(403).json({
      message: 'Only instructors can access this route'
    });
  }
  next();
};

// Check if user is student
exports.studentAuth = async (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({
      message: 'Only students can access this route'
    });
  }
  next();
}; 