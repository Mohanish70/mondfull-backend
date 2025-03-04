const mongoose = require('mongoose');

const meditationSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Meditation', meditationSchema);
