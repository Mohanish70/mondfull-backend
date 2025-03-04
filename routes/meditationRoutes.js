const express = require('express');
const { getMeditations, addMeditation, updateMeditation } = require('../controllers/meditationController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(getMeditations).post(protect, admin, addMeditation);
router.route('/:id').put(protect, admin, updateMeditation);

module.exports = router;
