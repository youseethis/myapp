// backend/Controllers/patmentDetailsController.js
const PaymentDetails = require('../models/paymentDetailsModel');

// Function to generate an 8-digit random number
function generateRandomControlNo() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// Function to generate an 8-digit random number
async function generateUniqueControlNo() {
  let controlno;
  let existingControlNo;
  do {
    controlno = Math.floor(10000000 + Math.random() * 90000000).toString();
    existingControlNo = await PaymentDetails.findOne({ controlno });
  } while (existingControlNo);
  return controlno;
}

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const controlno = await generateUniqueControlNo(); // Generate the unique control number
    const paymentData = {
      ...req.body,
      controlno, // Add the generated control number to the payment data
    };
    const payment = new PaymentDetails(paymentData);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentDetails.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await PaymentDetails.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get payments by applicationID
exports.getPaymentsByApplicationId = async (req, res) => {
  const { applicationID } = req.params;

  try {
    const payments = await PaymentDetails.find({ applicationID }).sort({ createdAt: -1 });

    if (payments.length === 0) {
      return res.status(404).json({ message: 'No payments found for this application ID' });
    }

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a payment by ID
exports.updatePaymentById = async (req, res) => {
  try {
    const payment = await PaymentDetails.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a payment by ID
exports.deletePaymentById = async (req, res) => {
  try {
    const payment = await PaymentDetails.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
