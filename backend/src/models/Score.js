const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema(
  {
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Score', ScoreSchema);
