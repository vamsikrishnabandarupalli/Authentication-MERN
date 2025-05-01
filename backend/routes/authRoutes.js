const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('username')
      .optional()
      .notEmpty()
      .withMessage('Username must not be empty if provided'),
  ],
  authController.register
);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.post('/refresh-token', authController.refreshToken);

module.exports = router;
