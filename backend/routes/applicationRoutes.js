const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// Existing routes
router.post('/applications', applicationController.createApplication);
router.get('/applications', applicationController.getAllApplications);
router.get('/applications/user-season', applicationController.getApplicationsByUserAndSeason);
router.get('/applications/:id', applicationController.getApplicationById);
router.get('/applications/user/:userID', applicationController.getApplicationsByUserId);
router.patch('/applications/:id', applicationController.updateApplicationById);
router.delete('/applications/:id', applicationController.deleteApplicationById);

module.exports = router;
