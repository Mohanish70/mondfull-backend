const Meditation = require('../models/Meditation');

// Get all meditations
exports.getMeditations = async (req, res) => {
  try {
    const meditations = await Meditation.find();
    res.json(meditations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new meditation
exports.addMeditation = async (req, res) => {
  try {
    const { title, description, duration } = req.body;

    const meditation = await Meditation.create({
      title,
      description,
      duration,
    });

    res.status(201).json(meditation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update meditation details
exports.updateMeditation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration } = req.body;

    const updatedMeditation = await Meditation.findByIdAndUpdate(
      id,
      { title, description, duration },
      { new: true }
    );

    if (!updatedMeditation) {
      return res.status(404).json({ message: 'Meditation not found' });
    }

    res.json(updatedMeditation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
