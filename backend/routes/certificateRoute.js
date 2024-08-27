// backend/routes/certificateRoute.js
const express = require('express');
const { generateCertificate } = require('../Controllers/generateCertificate');
const router = express.Router();

router.get('/generate', async (req, res) => {  // Modify the route to accept the full name via query parameters
  try {
    // Call generateCertificate and pass the request and response objects
    await generateCertificate(req, res);
  } catch (error) {
    console.error('Error generating certificate:', error);
    if (!res.headersSent) {
      res.status(500).send('Internal Server Error');
    }
  }
});

module.exports = router;
