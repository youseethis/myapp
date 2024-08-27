// routes/useridRoute.js
const express = require('express');
const router = express.Router();
const decodeToken = require('../utils/decodeUser');

// Endpoint to decode token and return user ID
router.get('/decodetoken', decodeToken, (req, res) => {
  res.status(200).json({ userId: req.userId });
});

module.exports = router;
