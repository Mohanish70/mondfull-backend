const express = require('express');
const { check } = require('express-validator');
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

const router = express.Router();

// Register
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email required').isEmail(),
    check('password', 'Password must be 6+ chars').isLength({ min: 6 }),
  ],
  registerUser
);

// Login
router.post(
  '/login',
  [
    check('email', 'Valid email required').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

// Forgot password
router.post('/forgotpassword', forgotPassword);

// Reset password
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
