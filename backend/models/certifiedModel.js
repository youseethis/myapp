const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Certified schema
const CertifiedSchema = new Schema({
  year: {
    type: String,
    required: true,
  },
  certificateNo: {
    type: String,
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  filePath: { // New field for the path of the uploaded certificate
    type: String,
    required: true,
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the model
module.exports = mongoose.model('Certified', CertifiedSchema);
