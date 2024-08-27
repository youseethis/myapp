// backend/Controllers/applicationController.js
const mongoose = require('mongoose'); // Add this line to import mongoose
const Application = require('../models/applicationModel');

// Create a new application
exports.createApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch applications by userID
exports.getApplicationsByUserId = async (req, res) => {
  try {
    const { userID } = req.params; // Extract userID from request parameters
    const applications = await Application.find({ userID });
    if (applications.length === 0) return res.status(404).json({ message: 'No applications found for this user' });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch applications by userID and season_ID
exports.getApplicationsByUserAndSeason = async (req, res) => {
  try {
    const { userID, season_ID } = req.query; // Extract userID and season_ID from query parameters

    // Validate the ObjectId format for userID and season_ID
    if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(season_ID)) {
      return res.status(400).json({ message: 'Invalid userID or season_ID format' });
    }

    // Ensure both parameters are provided
    if (!userID || !season_ID) {
      return res.status(400).json({ message: 'Both userID and season_ID are required' });
    }

    // Find applications matching the criteria
    const applications = await Application.find({ userID, season_ID });
    if (applications.length === 0) return res.status(404).json({ message: 'No applications found for these criteria' });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an application by ID
exports.updateApplicationById = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an application by ID
exports.deleteApplicationById = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.status(200).json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
