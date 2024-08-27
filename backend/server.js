require('dotenv').config(); // Load environment variables

// Debugging: Print email credentials to the console
console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS);

const express = require('express');
const cors = require('cors'); // Import the cors module
const mongoose = require('mongoose');
const multer = require('multer'); // Import multer
const userRoutes = require('./routes/userRoutes');
const certifiedRoutes = require('./routes/certifiedRoutes');
const historysetRoutes = require('./routes/historysetRoutes');
const useridRoute = require('./routes/useridRoute');
const applicationRoutes = require('./routes/applicationRoutes'); // Import the application routes
const paymentDetailsRoutes = require('./routes/paymentDetailsRoutes'); // Import the payment details routes
const seasonRoutes = require('./routes/seasonRoutes'); // Import the season routes
const certificateRoute = require('./routes/certificateRoute');

const app = express();
const API_PORT = process.env.PORT || 4000; // Port for the API

// Middleware
app.use(express.json());

// CORS Configuration
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust the origin as needed

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

// Set Mongoose options
mongoose.set('strictQuery', false);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Routes for API
app.use('/users', userRoutes);
app.use('/certifieds', certifiedRoutes);
app.use('/historyset', historysetRoutes);
app.use('/decoded', useridRoute);
app.use('/api', applicationRoutes); // Use the application routes
app.use('/api', paymentDetailsRoutes); // Use the payment details routes
app.use('/api', seasonRoutes); // Use the season routes
app.use('/api/certificate', certificateRoute);

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB'); // Log success message
    // Start the API server
    app.listen(API_PORT, () => {
      console.log(`API Server is running on port ${API_PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error); // Log error message
  });
