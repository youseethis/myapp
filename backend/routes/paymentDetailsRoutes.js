const express = require('express');
const router = express.Router();
const paymentDetailsController = require('../controllers/paymentDetailsController');

// Create a new payment
router.post('/payments', paymentDetailsController.createPayment);

// Get all payments
router.get('/payments', paymentDetailsController.getAllPayments);

// Get a payment by ID
router.get('/payments/:id', paymentDetailsController.getPaymentById);

// Get payments by applicationID
router.get('/payments/application/:applicationID', paymentDetailsController.getPaymentsByApplicationId); // New route for applicationID

// Update a payment by ID
router.patch('/payments/:id', paymentDetailsController.updatePaymentById);

// Delete a payment by ID
router.delete('/payments/:id', paymentDetailsController.deletePaymentById);

module.exports = router;
