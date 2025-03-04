const JournalEntry = require('../models/JournalEntry');

// Add a journal entry
exports.addJournalEntry = async (req, res) => {
  try {
    const { title, content } = req.body;

    const journalEntry = await JournalEntry.create({
      user: req.user.id,
      title,
      content,
    });

    res.status(201).json(journalEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all journal entries for a user
exports.getJournalEntries = async (req, res) => {
  try {
    const journalEntries = await JournalEntry.find({ user: req.user.id });

    res.json(journalEntries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a journal entry
exports.updateJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedEntry = await JournalEntry.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
