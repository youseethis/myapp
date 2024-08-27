// routes/historysetRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllHistorysets,
  getHistorysetById,
  getHistorysetByUserId,
  createHistoryset,
  deleteHistoryset,
  updateHistoryset
} = require('../controllers/historysetController');

// Get all history sets
router.get('/', getAllHistorysets);

// Get a single history set by ID
router.get('/:id', getHistorysetById);

// Get history set by user ID
router.get('/user/:userId', getHistorysetByUserId); // Ensure this line is correct

// Create a new history set
router.post('/', createHistoryset);

// DELETE a history set
router.delete('/:id', deleteHistoryset);

// UPDATE a history set
router.patch('/:id', updateHistoryset);

module.exports = router;
