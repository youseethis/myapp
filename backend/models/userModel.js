// //Filename : backend/models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Fname: {
    type: String,
    required: true
  },
  Lname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  credentials: {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  Roles: {
    type: [String],
    default: [] // Start with an empty array
  }
}, { timestamps: true });

// Static login method
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ 'credentials.email': email });
  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.credentials.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
