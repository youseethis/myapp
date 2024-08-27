// backend/consider/historyset.js
const jwt = require('jsonwebtoken');
const Historyset = require('../models/historysetModel');

const decideHomepage = async (token) => {
  try {
    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.SECRET);
    const userID = decoded.id;

    // Fetch the user's historyset
    const historyset = await Historyset.findOne({ userID });

    if (!historyset) {
      throw new Error('Historyset not found for this user');
    }

    // Determine the homepage based on the historyset value
    if (historyset.histoset === 'na') {
      return '/AdminDashboard';
    } else {
      return '/applicationpage'; // Add a default page if needed
    }
  } catch (error) {
    console.error('Error deciding homepage:', error);
    return '/errorpage'; // Redirect to an error page if something goes wrong
  }
};

module.exports = decideHomepage;
