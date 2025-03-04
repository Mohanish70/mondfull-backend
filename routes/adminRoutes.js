const express = require('express');
const { getAllUsers, deleteUser, deleteJournalEntry } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/users', protect, admin, getAllUsers);
router.delete('/user/:id', protect, admin, deleteUser);
router.delete('/journal/:id', protect, admin, deleteJournalEntry);

module.exports = router;
