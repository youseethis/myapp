// backend/models/applicationModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Application schema
const applicationSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected'], // You can define specific statuses
    default: 'pending'
  },
  season_ID: {
    type: Schema.Types.ObjectId,
    ref: 'Season',
    required: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the Application model
const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
