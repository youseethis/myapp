const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historysetSchema = new Schema({
  histoset: {
    type: String,
    required: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Historyset', historysetSchema);
