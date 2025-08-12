// routes/authRoutes.js
const express = require('express');
const { check } = require('express-validator');
const {
  loginUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

// POST /api/auth/forgotpassword
router.post('/forgotpassword', forgotPassword);

// PUT /api/auth/resetpassword/:resettoken
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
