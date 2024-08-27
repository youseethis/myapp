// File name : backend/Controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Ensure the path is correct
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const sendEmail = require('../utils/sendEmail');

// Other functions...
// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a single user
const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'No such user' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
const { Fname, Lname, gender, Phone, email, address, credentials } = req.body;


let emptyFields = [];

if (!Fname) {
  emptyFields.push('Fname');
}
if (!Lname) {
  emptyFields.push('Lname');
}
if (!gender) {
  emptyFields.push('gender');
}
if (!Phone) {
  emptyFields.push('Phone');
}
if (!email) {
  emptyFields.push('email');
}
if (!address) {
  emptyFields.push('address');
}
if (!credentials || !credentials.email) {
  emptyFields.push('credentials.email');
}
if (!credentials || !credentials.password) {
  emptyFields.push('credentials.password');
}
if (emptyFields.length > 0) {
  return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
}

// Log the password before hashing
//console.log("Password before hashing:", credentials.password);
// Hash the password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(credentials.password, salt);
//const rawPassword = credentials.password;

// Add to the database
try {
  const user = await User.create({ 
    Fname, 
    Lname, 
    gender, 
    Phone, 
    email, 
    address, 
    credentials: {
      email: credentials.email,
      password: hashedPassword
    }
  });
  res.status(200).json(user);
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

// delete a User
const deleteUser = async (req, res) => {
const { id } = req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({error: 'No such User'})
}

const user = await User.findOneAndDelete({_id: id})

if(!user) {
  return res.status(400).json({error: 'No such user'})
}

res.status(200).json(user)
}

// Update a User
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such User' });
  }

  let updatedData = { ...req.body };

  if (updatedData.credentials && updatedData.credentials.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(updatedData.credentials.password, salt);
    updatedData.credentials.password = hashedPassword;
  }

  const user = await User.findOneAndUpdate({ _id: id }, updatedData, { new: true });

  if (!user) {
    return res.status(400).json({ error: 'No such User' });
  }

  res.status(200).json(user);
}


// backend/controllers/userController.js
const registerUser = async (req, res) => {
  const { Fname, Lname, gender, Phone, email, address, password } = req.body;

  // Log the request body for debugging
  console.log('Received registration data:', req.body);

  try {
    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Save the user to the database
    const newUser = await User.create({
      Fname,
      Lname,
      gender,
      Phone,
      email,
      address,
      credentials: { email, password: hashedPassword },
    });

    // Send email with username and password
    const emailSubject = 'Your Registration Details';
    const emailText = `Dear ${Fname} ${Lname},\n\nYou have been registered successfully.\n\nUsername: ${email}\nPassword: ${password}\n\nRegards,\nYour Team`;

    await sendEmail(email, emailSubject, emailText);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(400).json({ error: error.message });
  }
};



//LOGIN 
const createToken = (_id) => {
return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser
};
