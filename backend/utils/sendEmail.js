// backend/utils/sendEmail.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const sendEmail = async (to, subject, text) => {
  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email address from the .env file
      pass: process.env.EMAIL_PASS, // Your app-specific password from the .env file
    },
  });

  // Email options with a display name
  let mailOptions = {
    from: `"ACCOUNT REGISTRATION!" <${process.env.EMAIL_USER}>`, // Display name and email address
    to,
    subject,
    text,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
