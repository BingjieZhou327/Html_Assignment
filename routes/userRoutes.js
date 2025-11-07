const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');
const {
  validate,
  emailValidation,
  fullNameValidation,
  passwordValidation,
  optionalFullNameValidation,
  optionalPasswordValidation
} = require('../middleware/validation');

// Create user
router.post(
  '/create',
  [emailValidation, fullNameValidation, passwordValidation, validate],
  userController.createUser
);

// Update user
router.put(
  '/edit',
  [emailValidation, optionalFullNameValidation, optionalPasswordValidation, validate],
  userController.updateUser
);

// Delete user
router.delete(
  '/delete',
  [emailValidation, validate],
  userController.deleteUser
);

// Get all users
router.get(
  '/getAll',
  userController.getAllUsers
);

// Upload image
router.post(
  '/uploadImage',
  upload.single('image'),
  (err, req, res, next) => {
    if (err) {
      if (err.message === 'Invalid file format. Only JPEG, PNG, and GIF are allowed.') {
        return res.status(400).json({ error: err.message });
      }
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds 5MB limit.' });
      }
      return res.status(400).json({ error: err.message });
    }
    next();
  },
  userController.uploadImage
);

module.exports = router;

