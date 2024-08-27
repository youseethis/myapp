const express = require('express');
const router = express.Router();
const decideHomepage = require('../consider/historyset');

// Endpoint to decide homepage based on user's historyset
router.post('/decideHomepage', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const homepage = await decideHomepage(token);
    res.status(200).json({ homepage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
