// File name: backend/routes/certifiedRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllCertifications,
  getCertificationById,
  createCertification,
  deleteCertification,
  updateCertification,
  getCertificationsByUserId // Import the new function
} = require('../controllers/certifiedController');

// Get all certifications
router.get('/', getAllCertifications);

// Get a single certification by ID
router.get('/:id', getCertificationById);

// Get certifications by userID
router.get('/user/:userID', getCertificationsByUserId); // New route for userID

// Create a new certification
router.post('/', createCertification);

// DELETE a certification
router.delete('/:id', deleteCertification);

// UPDATE a certification
router.patch('/:id', updateCertification);

module.exports = router;
