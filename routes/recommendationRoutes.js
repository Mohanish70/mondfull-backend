// routes/recommendationRoutes.js
const express = require('express');
const router = express.Router();
const { getRecommendation, joinChallenge } = require('../controllers/recommendationController');

// Define the route for getting a recommendation based on the mood
router.post('/getRecommendation', getRecommendation);

// Define the route for joining a challenge
router.post('/joinChallenge', joinChallenge);

module.exports = router;
