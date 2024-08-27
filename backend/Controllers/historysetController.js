const mongoose = require('mongoose');
const Historyset = require('../models/historysetModel');

// Get all history sets
const getAllHistorysets = async (req, res) => {
  try {
    const historysets = await Historyset.find({}).sort({ createdAt: -1 });
    res.status(200).json(historysets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single history set by ID
const getHistorysetById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such history set' });
  }

  try {
    const historyset = await Historyset.findById(id);

    if (!historyset) {
      return res.status(404).json({ error: 'No such history set' });
    }

    res.status(200).json(historyset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a history set by user ID
const getHistorysetByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: 'No such user' });
  }

  try {
    const historyset = await Historyset.findOne({ userID: userId });

    if (!historyset) {
      return res.status(404).json({ error: 'No history set found for this user' });
    }

    res.status(200).json(historyset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new history set
const createHistoryset = async (req, res) => {
  const { histoset, userID } = req.body;

  console.log("Received data to create historyset:", req.body); // Debug log

  if (!histoset || !userID) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields: ['histoset', 'userID'] });
  }

  try {
    const newHistoryset = await Historyset.create({ histoset, userID });
    res.status(201).json(newHistoryset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a history set
const deleteHistoryset = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such history set' });
  }

  const historyset = await Historyset.findOneAndDelete({ _id: id });

  if (!historyset) {
    return res.status(400).json({ error: 'No such history set' });
  }

  res.status(200).json(historyset);
};

// Update a history set
const updateHistoryset = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such history set' });
  }

  const updatedData = { ...req.body };

  const historyset = await Historyset.findOneAndUpdate({ _id: id }, updatedData, { new: true });

  if (!historyset) {
    return res.status(400).json({ error: 'No such history set' });
  }

  res.status(200).json(historyset);
};

module.exports = {
  getAllHistorysets,
  getHistorysetById,
  getHistorysetByUserId,
  createHistoryset,
  updateHistoryset,
  deleteHistoryset
};
