// File: backend/controllers/certifiedController.js
const mongoose = require('mongoose');
const Certified = require('../models/certifiedModel');

// Get all certifications
const getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certified.find({}).sort({ createdAt: -1 });
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single certification by ID
const getCertificationById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such certification' });
  }

  try {
    const certification = await Certified.findById(id);

    if (!certification) {
      return res.status(404).json({ error: 'No such certification' });
    }

    res.status(200).json(certification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get certifications by userID
const getCertificationsByUserId = async (req, res) => {
  const { userID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({ error: 'Invalid userID' });
  }

  try {
    const certifications = await Certified.find({ userID }).sort({ createdAt: -1 });

    if (certifications.length === 0) {
      return res.status(404).json({ error: 'No certifications found for this user' });
    }

    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new certification
const createCertification = async (req, res) => {
  const { year, certificateNo, userID, filePath } = req.body; // Include filePath in destructuring

  let emptyFields = [];

  if (!certificateNo) {
    emptyFields.push('certificateNo');
  }
  if (!userID) {
    emptyFields.push('userID');
  }
  if (!filePath) { // Check if filePath is provided
    emptyFields.push('filePath');
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  // Add to the database
  try {
    const certification = await Certified.create({
      year,
      certificateNo,
      userID,
      filePath // Include filePath in the certification creation
    });
    res.status(200).json(certification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a certification
const deleteCertification = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such certification' });
  }

  const certification = await Certified.findOneAndDelete({ _id: id });

  if (!certification) {
    return res.status(400).json({ error: 'No such certification' });
  }

  res.status(200).json(certification);
};

// Update a certification
const updateCertification = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such certification' });
  }

  const updatedData = { ...req.body };

  const certification = await Certified.findOneAndUpdate({ _id: id }, updatedData, { new: true });

  if (!certification) {
    return res.status(400).json({ error: 'No such certification' });
  }

  res.status(200).json(certification);
};

module.exports = {
  getAllCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
  getCertificationsByUserId // Ensure this function is exported
};
