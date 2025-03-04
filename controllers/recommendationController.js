const db = require('../config/db'); // Assuming this is the MongoDB connection, or use Mongoose

// For the /getRecommendation route
const getRecommendation = (req, res) => {
  const { mood } = req.body;

  // Validate the mood input
  if (!mood) {
    return res.status(400).json({ error: 'Mood is required' });
  }

  let recommendation;

  switch (mood) {
    case 'anxious':
      recommendation = "Try the 10-minute Mindfulness Meditation.";
      break;
    case 'stressed':
      recommendation = "How about a 15-minute Body Scan session?";
      break;
    case 'happy':
      recommendation = "You might enjoy the Focus & Productivity session.";
      break;
    case 'tired':
      recommendation = "A 20-minute Sleep Meditation could help.";
      break;
    default:
      recommendation = "Let us help you find the right session.";
  }

  // Return the recommendation
  res.json({ recommendation });
};

// For the /joinChallenge route
const joinChallenge = (req, res) => {
  const { challengeName } = req.body;
  const userEmail = req.user.email; // Assuming the user is authenticated and their email is available in req.user.email

  // Validate challengeName and userEmail
  if (!challengeName || !userEmail) {
    return res.status(400).json({ error: 'Challenge name and user email are required' });
  }

  // Assuming you're using MongoDB, here is the update logic
  db.collection('challenges').updateOne(
    { name: challengeName },
    { $push: { participants: userEmail } },
    (err, result) => {
      if (err) {
        console.error('Error joining challenge:', err);
        return res.status(500).send('Error joining challenge');
      }
      if (result.matchedCount === 0) {
        return res.status(404).send('Challenge not found');
      }
      res.status(200).send('You have successfully joined the challenge!');
    }
  );
};

module.exports = {
  getRecommendation,
  joinChallenge,
};
