const User = require('../models/User');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      password
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update fields if provided
    if (fullName) {
      user.fullName = fullName;
    }

    if (password) {
      user.password = password; // Will be hashed by pre-save hook
    }

    await user.save();

    res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Find and delete user
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Delete associated image if exists
    if (user.imagePath) {
      const imagePath = path.join(__dirname, '..', user.imagePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'fullName email password');

    const userList = users.map(user => ({
      fullName: user.fullName,
      email: user.email,
      password: user.password // Hashed password
    }));

    res.status(200).json({ users: userList });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Upload user image
const uploadImage = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email is provided
    if (!email) {
      // Delete uploaded file if exists
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: 'Email is required.' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // Delete uploaded file
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if user already has an image
    if (user.imagePath) {
      // Delete uploaded file
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: 'Image already exists for this user.' });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided.' });
    }

    // Store image path in database
    const filePath = `/images/${req.file.filename}`;
    user.imagePath = filePath;
    await user.save();

    res.status(201).json({
      message: 'Image uploaded successfully.',
      filePath: filePath
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    // Delete uploaded file if exists
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  uploadImage
};

