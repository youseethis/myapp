const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Season schema
const seasonSchema = new Schema({
  seasonname: {
    type: String,
    required: true
  },
  startingdate: {
    type: Date,
    required: true
  },
  endingdate: {
    type: Date // No required constraint
  },
  seasonstatus: {
    type: String // New field added
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the Season model
const Season = mongoose.model('Season', seasonSchema);

module.exports = Season;
