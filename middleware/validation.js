const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed.', details: errors.array() });
  }
  next();
};

// Email validation
const emailValidation = body('email')
  .isEmail()
  .withMessage('Invalid email format')
  .normalizeEmail();

// Full name validation (only alphabetic characters and spaces)
const fullNameValidation = body('fullName')
  .matches(/^[A-Za-z\s]+$/)
  .withMessage('Full name must contain only alphabetic characters')
  .trim()
  .notEmpty()
  .withMessage('Full name is required');

// Password validation
// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character
const passwordValidation = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character');

// Optional full name validation (for update)
const optionalFullNameValidation = body('fullName')
  .optional()
  .matches(/^[A-Za-z\s]+$/)
  .withMessage('Full name must contain only alphabetic characters')
  .trim();

// Optional password validation (for update)
const optionalPasswordValidation = body('password')
  .optional()
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character');

module.exports = {
  validate,
  emailValidation,
  fullNameValidation,
  passwordValidation,
  optionalFullNameValidation,
  optionalPasswordValidation
};

