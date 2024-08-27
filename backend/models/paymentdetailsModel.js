// backend/models/paymentDetailsModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the PaymentDetails schema
const paymentDetailsSchema = new Schema({
  paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed'] // You can define specific statuses
  },
  controlno: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
  },
  applicationID: {
    type: Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the PaymentDetails model
const PaymentDetails = mongoose.model('PaymentDetails', paymentDetailsSchema);

module.exports = PaymentDetails;
