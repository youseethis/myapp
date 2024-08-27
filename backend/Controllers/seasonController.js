const Season = require('../models/seasonModel');

// Create a new season
exports.createSeason = async (req, res) => {
  try {
    const season = new Season(req.body);
    await season.save();
    res.status(201).json(season);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all seasons
exports.getAllSeasons = async (req, res) => {
  try {
    const seasons = await Season.find();
    res.status(200).json(seasons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a season by ID
exports.getSeasonById = async (req, res) => {
  try {
    const season = await Season.findById(req.params.id);
    if (!season) return res.status(404).json({ message: 'Season not found' });
    res.status(200).json(season);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get seasons by status
exports.getSeasonByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const seasons = await Season.find({ seasonstatus: status });
    if (seasons.length === 0) return res.status(404).json({ message: 'No seasons found with this status' });
    res.status(200).json(seasons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a season by ID
exports.updateSeasonById = async (req, res) => {
  try {
    const season = await Season.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!season) return res.status(404).json({ message: 'Season not found' });
    res.status(200).json(season);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a season by ID
exports.deleteSeasonById = async (req, res) => {
  try {
    const season = await Season.findByIdAndDelete(req.params.id);
    if (!season) return res.status(404).json({ message: 'Season not found' });
    res.status(200).json({ message: 'Season deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
