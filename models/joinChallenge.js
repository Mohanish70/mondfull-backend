const Challenge = require('../models/Challenge'); // Assuming you have a Challenge model

const joinChallenge = async (req, res) => {
  const { challengeName } = req.body;
  const userEmail = req.user?.email; // Assuming user is authenticated and email is in req.user.email

  if (!userEmail) {
    return res.status(401).json({ error: 'You must be logged in to join a challenge.' });
  }

  if (!challengeName) {
    return res.status(400).json({ error: 'Challenge name is required' });
  }

  try {
    const challenge = await Challenge.findOneAndUpdate(
      { name: challengeName },
      { $push: { participants: userEmail } },
      { new: true } // Return the updated challenge document
    );

    if (!challenge) {
      return res.status(404).send('Challenge not found');
    }

    res.status(200).send('You have successfully joined the challenge!');
  } catch (error) {
    console.error('Error joining challenge:', error);
    res.status(500).send('Error joining challenge');
  }
};

module.exports = {
  joinChallenge,
};
