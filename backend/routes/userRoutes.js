// File name : backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, registerUser, deleteUser, updateUser, loginUser } = require('../controllers/userController');

// Get all users
router.get('/', getAllUsers);

// Get a single user by ID
router.get('/:id', getUserById);

// Create a new user
router.post('/', createUser);

//Send Credentials to user email
router.post('/register', registerUser);

// DELETE a user
router.delete('/:id', deleteUser);

// UPDATE a user
router.patch('/:id', updateUser);

// LOGIN route
router.post('/login', loginUser);

module.exports = router;
