const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware'); // Middleware to protect routes

const router = express.Router();

// Authentication Routes
router.post('/register', registerUser); // POST /auth/register
router.post('/login', loginUser); // POST /auth/login
router.get('/profile', protect, getUserProfile); // GET /auth/profile (Protected route)
    
module.exports = router;
