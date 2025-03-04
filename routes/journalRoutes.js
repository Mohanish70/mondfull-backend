const express = require('express');
const { addJournalEntry, getJournalEntries, updateJournalEntry } = require('../controllers/journalController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(protect, addJournalEntry).get(protect, getJournalEntries);
router.route('/:id').put(protect, updateJournalEntry);

module.exports = router;
