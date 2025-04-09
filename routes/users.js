const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { isAuthenticated } = require('../middleware/authenticate');

// Public GET routes
router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

// Protected POST, PUT, DELETE
router.post(
  '/',
  isAuthenticated,
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('favoriteColor').notEmpty().withMessage('Favorite color is required'),
    body('birthday').isISO8601().withMessage('Valid birthday is required')
  ],
  usersController.createUser
);

router.put(
  '/:id',
  isAuthenticated,
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('favoriteColor').notEmpty().withMessage('Favorite color is required'),
    body('birthday').isISO8601().withMessage('Valid birthday is required')
  ],
  usersController.updateUser
);

router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;
