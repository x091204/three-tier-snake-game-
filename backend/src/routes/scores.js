const express = require('express');
const router  = express.Router();
const Score   = require('../models/Score');

router.post('/', async (req, res) => {
  try {
    const saved = await new Score({ score: req.body.score }).save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1 })
      .limit(10)
      .select('score createdAt');
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
