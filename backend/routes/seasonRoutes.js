const express = require('express');
const router = express.Router();
const seasonController = require('../controllers/seasonController');

// Route to create a new season
router.post('/seasons', seasonController.createSeason);

// Route to get all seasons
router.get('/seasons', seasonController.getAllSeasons);

// Route to get a season by ID
router.get('/seasons/:id', seasonController.getSeasonById);

// Route to get seasons by status
router.get('/seasons/status/:status', seasonController.getSeasonByStatus);

// Route to update a season by ID
router.patch('/seasons/:id', seasonController.updateSeasonById);

// Route to delete a season by ID
router.delete('/seasons/:id', seasonController.deleteSeasonById);

module.exports = router;
